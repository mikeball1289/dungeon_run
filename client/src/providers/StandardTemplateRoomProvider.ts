import { TemplateRoom } from "../../../common/TemplateRoom";
import { staticImplements } from "./Decorator";
import { IProvider } from "./IProvider";

@staticImplements<IProvider>()
export class StandardTemplateRoomProvider {

    public static templates: TemplateRoom[];

    public static ready(): Promise<void> {
        let p = new Promise<void>( (resolve, reject) => {
            if (this.templates === undefined) {
                let req = new XMLHttpRequest();
                req.open("GET", "/templates.json");
                req.addEventListener("load", function(e) {
                    let templates: TemplateRoom[] = JSON.parse(this.responseText).map( (d: number[][]) => new TemplateRoom(d) );
                    StandardTemplateRoomProvider.templates = templates;
                    resolve();
                    // templates.forEach( (t) => console.log(t.toString()) );
                    // let dungeon = (window as any).dungeon = DunGen(templates, { height: 100, width: 100 });
                    // main(dungeon);
                } );
                req.addEventListener("error", reject);
                req.send();
            } else {
                resolve();
            }
        } );
        return p;
    }

    public static isReady(): boolean {
        return this.templates !== undefined;
    }

}
