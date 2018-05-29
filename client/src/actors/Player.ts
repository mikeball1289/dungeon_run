import { TimelineLite, Linear, TimelineMax } from "gsap";
import { Direction } from "../../../common/TemplateRoom";
import { root } from "../root";
import { IPlayerState, EMovingDirection } from "../../../common/types";
import { Actor } from "./Actor";

/*
Player (client) - mostly just a pile of animation code with some view logic tossed in. Using gsap for animations
*/
export class Player extends PIXI.Container implements Actor<IPlayerState> {
    
    // TODO: This sprite creation repetion needs to be refactored
    private body = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(document.getElementById("body") as HTMLImageElement)));
    private head = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(document.getElementById("head") as HTMLImageElement)));
    private left_foot = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(document.getElementById("left_foot") as HTMLImageElement)));
    private right_foot = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(document.getElementById("right_foot") as HTMLImageElement)));
    private sword = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(document.getElementById("sword") as HTMLImageElement)));
    
    private readonly weaponAnchor = new PIXI.Point(247, 306);
    private readonly armLength = 50;
    
    private playerSprite = new PIXI.Container();
    
    private walking = false;
    private walkingAnimation: TimelineLite | undefined;
    // between the moving direction and the facing direction we know if the player is going forwards or backwards
    private moving = EMovingDirection.NONE;
    private facing = Direction.RIGHT;

    constructor(state: IPlayerState) {
        super();

        this.x = state.x;
        this.y = state.y;
        this.moving = state.moving

        // set pivot points for smooth rotation animations
        // all images are the same size and overlay into the correct positions
        // pivot points are decided by opening the image in Paint.NET or
        // Photoshop and checking the coordinate of where you visually want
        // the limb to rotate around
        this.head.pivot.set(265, 268);
        this.head.position.set(265, 268);
        this.left_foot.pivot.set(280, 358);
        this.left_foot.position.set(280, 358);
        this.right_foot.pivot.set(235, 358);
        this.right_foot.position.set(235, 358);
        this.sword.pivot.set(247, 306);
        this.sword.position.set(247, 306);
        
        // layering the images
        this.playerSprite.addChild(this.left_foot);
        this.playerSprite.addChild(this.body);
        this.playerSprite.addChild(this.right_foot);
        this.playerSprite.addChild(this.head);
        this.playerSprite.addChild(this.sword);

        // the player pivot is where the targeting vector comes from, should be around the middle of the player
        this.playerSprite.pivot.set(275, 280);

        // adjust overall pivot to put the player's feet on the ground
        this.pivot.set(0, 100);
        this.scale.set(0.15);
        this.addChild(this.playerSprite);
    }

    // helper function to see if we're moving backwards or not. Returns false if not moving at all
    private isMovingBackwards() {
        return (this.facing === Direction.RIGHT && this.moving === EMovingDirection.LEFT) || 
                (this.facing === Direction.LEFT && this.moving === EMovingDirection.RIGHT)
    }

    // animate from whatever position we happen to be in to the standing position 
    private beginStand() {
        let leadIn = new TimelineLite();
        leadIn.to(this.left_foot, 0.3, { x: 280, y: 358, rotation: 0, ease: Linear.easeOut } );
        leadIn.to(this.right_foot, 0.3, { x: 235, y: 358, rotation: 0, ease: Linear.easeOut }, 0 );
        return leadIn;
    }

    // generates a walk cycle animation that loops both forwards and backwards
    private walkCycle() {
        let walkAnimation = new TimelineMax( {
            onReverseComplete: () => {
                walkAnimation.reverse(0);
            },
            onComplete: () => {
                walkAnimation.play(0);
            }
        } );
        let leftAnimation = new TimelineLite();
        leftAnimation.fromTo(this.left_foot, 0.2, { x: 230, rotation: Math.PI / 8}, { x: 260, y: 343, rotation: -Math.PI / 10, ease: Linear.easeNone } );
        leftAnimation.to(this.left_foot, 0.1, { x: 280, y: 358, rotation: 0, ease: Linear.easeNone } );
        leftAnimation.to(this.left_foot, 0.18, { x: 250, ease: Linear.easeNone } );
        leftAnimation.to(this.left_foot, 0.12, { x: 230, rotation: Math.PI / 8, ease: Linear.easeNone } );

        let rightAnimation = new TimelineLite();
        rightAnimation.fromTo(this.right_foot, 0.18, { x: 285, y: 358, rotation: 0 }, { x: 255, rotation: 0, ease: Linear.easeNone } );
        rightAnimation.to(this.right_foot, 0.12, { x: 235, rotation: Math.PI / 8, ease: Linear.easeNone } );
        rightAnimation.to(this.right_foot, 0.2, { x: 265, y: 343, rotation: -Math.PI / 10, ease: Linear.easeNone } );
        rightAnimation.to(this.right_foot, 0.1, { x: 285, y: 358, rotation: 0, ease: Linear.easeNone } );
        
        walkAnimation.add(leftAnimation);
        walkAnimation.add(rightAnimation, 0);
        if (this.isMovingBackwards()) {
            walkAnimation.reverse(0);
        }
        return walkAnimation;
    }

    // generate a little animation that leads into the walking animation loop
    private beginWalk() {
        // once we're done our lead-in begin the proper walk cycle
        let startWalkCycle = () => {
            if (this.walkingAnimation) this.walkingAnimation.kill();
            this.walkingAnimation = this.walkCycle();
            if (this.facing === Direction.LEFT) {
                this.walkingAnimation.reverse(0);
            }
        }
        // if the player turns around during the lead-in we'll end up playing in reverse, so begin the
        // walk cycle regardless of which direction the lead-in completes in
        let leadIn = new TimelineMax( {
            onComplete: startWalkCycle,
            onReverseComplete: startWalkCycle,
        } );
        // generate an appropriate animation based on which way we're facing
        if (!this.isMovingBackwards()) {
            leadIn.to(this.left_foot, 0.18, { x: 250, y: 358, rotation: 0, ease: Linear.easeNone } );
            leadIn.to(this.left_foot, 0.12, { x: 230, rotation: Math.PI / 8, ease: Linear.easeNone } );
            leadIn.to(this.right_foot, 0.2, { x: 265, y: 343, rotation: -Math.PI / 10, ease: Linear.easeNone }, 0 );
            leadIn.to(this.right_foot, 0.1, { x: 285, y: 358, rotation: 0, ease: Linear.easeNone }, 0.2 );
        } else {
            // awkward as fuck to generate the backwards lead-in because it's gonna get reversed whether we like it or not
            // honestly this should just get refactored to handle reversing the lead-in animation correctly.
            // or how about you make a lead in forwards, then add it to a timeline and reverse that timeline,
            // then add that timeline to the lead-in timeline and reverse the whole thing again so these animation fragments
            // are forwards? There's a thought, why didn't I think of that when I was struggling with this in the first
            // place? TODO: !!
            leadIn.from(this.right_foot, 0.3, { x: 285, y: 358, rotation: 0, ease: Linear.easeNone } );
            leadIn.fromTo(this.left_foot, 0.18, { x: 265, y: 343, rotation: 0, ease: Linear.easeNone }, { x: this.left_foot.x, y: this.left_foot.y, rotation: this.left_foot.rotation }, 0.12);
            leadIn.from(this.left_foot, 0.12, { x: 230, y: 358, rotation: Math.PI / 8, ease: Linear.easeNone }, 0);
            leadIn.reverse(0);
        }
        return leadIn;
    }

    // bring our visual state up to date with our data state
    update(state: IPlayerState) {
        this.x = state.x;
        this.y = state.y;
        this.moving = state.moving;
        
        // moving? better walk
        if (this.moving !== EMovingDirection.NONE && !this.walking) {
            if (this.walkingAnimation) this.walkingAnimation.kill();
            this.walkingAnimation = this.beginWalk();
            this.walking = true;
        }
        // not moving? better stand
        if (this.moving === EMovingDirection.NONE && this.walking) {
            if (this.walkingAnimation) this.walkingAnimation.kill();
            this.walkingAnimation = this.beginStand();
            this.walking = false;
        }
        // TODO: jumping? climbing? attacking?!?!

        // visual aiming is handled client-side to make a smoother experience 
        let global = this.playerSprite.getGlobalPosition();
        let dx = root.mouse.x - global.x;
        let dy = root.mouse.y - global.y;
        let rotation = Math.atan(dy / dx);
        rotation -= Math.PI / 2;

        if (dx < 0) {
            this.playerSprite.scale.x = -1;
            rotation = -rotation + Math.PI;
            this.facing = Direction.LEFT;
        } else {
            this.playerSprite.scale.x = 1;
            this.facing = Direction.RIGHT;
        }

        // reverse walking animation for moving backwards, set up the weapon and head to point at the cursor
        if (this.walkingAnimation && this.isMovingBackwards()) this.walkingAnimation.reverse();
        else if (this.walkingAnimation && !this.isMovingBackwards()) this.walkingAnimation.play();         
        this.sword.rotation = rotation;
        this.sword.position.set(this.weaponAnchor.x - this.armLength * Math.sin(rotation),
                                this.weaponAnchor.y + this.armLength * Math.cos(rotation));
        this.head.rotation = Math.cos(rotation) / 2;
    }
}