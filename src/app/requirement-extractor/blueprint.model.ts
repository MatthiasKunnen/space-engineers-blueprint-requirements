import { isParseError } from '../util/xml.util';

export class Blueprint {
    blocks: {[k: string]: number} = {};
    name: string;

    static fromXml(xml: string): Blueprint {
        const blueprint = new Blueprint();
        const {blocks} = blueprint;
        const parser = new DOMParser();
        const dom: XMLDocument = parser.parseFromString(xml, 'application/xml');

        if (isParseError(dom)) {
            throw new Error('Error while parsing XML');
        }

        console.log('DOM read:', dom);

        dom.querySelectorAll('MyObjectBuilder_CubeBlock').forEach(block => {
            const subtypeElement = block.querySelector('SubtypeName');

            if (subtypeElement === null) {
                console.warn(`Found no SubtypeName in`, block);
                return;
            }

            let blockType = `${block.getAttribute('xsi:type')}`;

            const subtype = subtypeElement.textContent;
            if (subtype !== null && subtype !== '') {
                blockType += `/${subtype}`;
            }

            blocks[blockType] = blocks[blockType] as any !== undefined ? blocks[blockType] : 0;
            blocks[blockType]++;
        });

        const id = dom.querySelector('Id');

        if (id === null) {
            console.log('Could not find Id tag with name in Subtype');
        } else {
            const name = id.getAttribute('Subtype');

            if (name === null) {
                console.log('No Subtype attribute on Id tag');
            } else {
                blueprint.name = name;
            }
        }

        return blueprint;
    }

    exportBlocksAsIni(): string {
        return Object.entries(this.blocks)
            .reduce<Array<{amount: number, type: string}>>((acc, [block, amount]) => {
                acc.push({
                    type: block,
                    amount: amount,
                });

                return acc;
            }, [])
            .sort((a, b) => b.amount - a.amount)
            .map(block => `${block.type}=${block.amount}`)
            .join('\n');
    }

    exportBlocksAsJson(): string {
        return JSON.stringify(this.blocks, undefined, 4);
    }
}
