import { TemplateRoom } from "../../../common/TemplateRoom";
import { staticImplements } from "./Decorator";
import { IProvider } from "./IProvider";

// provider for loading and reading a JSON file as room templates in dungeon construction
@staticImplements<IProvider>()
export class StandardTemplateRoomProvider {

    public static templates: TemplateRoom[];

    public static async ready(): Promise<void> {
        let p = new Promise<void>( (resolve, reject) => {
            if (this.templates === undefined) {
                let req = new XMLHttpRequest();
                req.open("GET", "/templates.json");
                req.addEventListener("load", function(e) {
                    let templates: TemplateRoom[] = JSON.parse(this.responseText).map( (d: number[][]) => new TemplateRoom(d) );
                    StandardTemplateRoomProvider.templates = templates;
                    resolve();
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
