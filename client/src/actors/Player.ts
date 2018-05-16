import { TimelineLite, Linear, TimelineMax } from "gsap";
import { Direction } from "../../../common/TemplateRoom";
import { root } from "../root";
import { IPlayerState, EMovingDirection } from "../../../common/types";

export class Player extends PIXI.Container {
    
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
    private moving = EMovingDirection.NONE;
    private facing = Direction.RIGHT;

    constructor(state: IPlayerState) {
        super();

        this.x = state.x;
        this.y = state.y;
        this.moving = state.moving

        this.head.pivot.set(265, 268);
        this.head.position.set(265, 268);
        this.left_foot.pivot.set(280, 358);
        this.left_foot.position.set(280, 358);
        this.right_foot.pivot.set(235, 358);
        this.right_foot.position.set(235, 358);
        this.sword.pivot.set(247, 306);
        this.sword.position.set(247, 306);
        
        this.playerSprite.addChild(this.left_foot);
        this.playerSprite.addChild(this.body);
        this.playerSprite.addChild(this.right_foot);
        this.playerSprite.addChild(this.head);
        this.playerSprite.addChild(this.sword);

        this.playerSprite.pivot.set(275, 280);
        this.pivot.set(0, 100);
        this.scale.set(0.15);
        this.addChild(this.playerSprite);
    }

    private beginStand() {
        let leadIn = new TimelineLite();
        leadIn.to(this.left_foot, 0.3, { x: 280, y: 358, rotation: 0, ease: Linear.easeOut } );
        leadIn.to(this.right_foot, 0.3, { x: 235, y: 358, rotation: 0, ease: Linear.easeOut }, 0 );
        return leadIn;
    }

    private isMovingBackwards() {
        return (this.facing === Direction.RIGHT && this.moving === EMovingDirection.LEFT) || 
                (this.facing === Direction.LEFT && this.moving === EMovingDirection.RIGHT)
    }

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

    private beginWalk() {
        let startWalkCycle = () => {
            if (this.walkingAnimation) this.walkingAnimation.kill();
            this.walkingAnimation = this.walkCycle();
            if (this.facing === Direction.LEFT) {
                this.walkingAnimation.reverse(0);
            }
        }
        let leadIn = new TimelineMax( {
            onComplete: startWalkCycle,
            onReverseComplete: startWalkCycle,
        } );
        if (!this.isMovingBackwards()) {
            leadIn.to(this.left_foot, 0.18, { x: 250, y: 358, rotation: 0, ease: Linear.easeNone } );
            leadIn.to(this.left_foot, 0.12, { x: 230, rotation: Math.PI / 8, ease: Linear.easeNone } );
            leadIn.to(this.right_foot, 0.2, { x: 265, y: 343, rotation: -Math.PI / 10, ease: Linear.easeNone }, 0 );
            leadIn.to(this.right_foot, 0.1, { x: 285, y: 358, rotation: 0, ease: Linear.easeNone }, 0.2 );
        } else {
            leadIn.from(this.right_foot, 0.3, { x: 285, y: 358, rotation: 0, ease: Linear.easeNone } );
            leadIn.fromTo(this.left_foot, 0.18, { x: 265, y: 343, rotation: 0, ease: Linear.easeNone }, { x: this.left_foot.x, y: this.left_foot.y, rotation: this.left_foot.rotation }, 0.12);
            leadIn.from(this.left_foot, 0.12, { x: 230, y: 358, rotation: Math.PI / 8, ease: Linear.easeNone }, 0);
            leadIn.reverse(0);
        }
        return leadIn;
    }

    update(state: IPlayerState) {
        this.x = state.x;
        this.y = state.y;
        this.moving = state.moving;
        
        if (this.moving !== EMovingDirection.NONE && !this.walking) {
            if (this.walkingAnimation) this.walkingAnimation.kill();
            this.walkingAnimation = this.beginWalk();
            this.walking = true;
        }
        if (this.moving === EMovingDirection.NONE && this.walking) {
            if (this.walkingAnimation) this.walkingAnimation.kill();
            this.walkingAnimation = this.beginStand();
            this.walking = false;
        }

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

        if (this.walkingAnimation && this.isMovingBackwards()) this.walkingAnimation.reverse();
        else if (this.walkingAnimation && !this.isMovingBackwards()) this.walkingAnimation.play();         
        this.sword.rotation = rotation;
        this.sword.position.set(this.weaponAnchor.x - this.armLength * Math.sin(rotation),
                                this.weaponAnchor.y + this.armLength * Math.cos(rotation));
        this.head.rotation = Math.cos(rotation) / 2;
    }
}