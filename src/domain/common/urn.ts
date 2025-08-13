export class Urn {
    private namespace: string;
    private resource: string;
    private ids: string[];

    /**
     * Creates a new Urn instance.
     * @param namespace - The namespace, e.g. "guardlight" or "dataloom"
     * @param resource - The resource type, e.g. "book" or "core"
     * @param ids - The ids that identify the resource, e.g. ["1234", "5678"]
     */
    constructor(namespace: string, resource: string, ids: string[]) {
        this.namespace = namespace;
        this.resource = resource;
        this.ids = ids;
    }

    /**
     * Constructs a URN string from the components.
     * Format: urn:{namespace}:{type}:{id1}:{id2}:...
     */
    toString(): string {
        return `urn:${this.namespace}:${this.resource}:${this.ids.join(":")}`;
    }

    /**
     * Parses a URN string and returns an Urn instance.
     * Throws an error if the string is not a valid URN.
     * @param urnString - The URN string to parse.
     */
    static parse(urnString: string): Urn {
        if (!urnString.startsWith("urn:")) {
            throw new Error("Invalid URN: must start with 'urn:'");
        }
        const parts = urnString.split(":");
        // urn:<namespace>:<type>:<id1>:<id2>...
        if (parts.length < 4) {
            throw new Error(
                "Invalid URN: must contain at least namespace, type, and one id"
            );
        }
        const [, namespace, type, ...ids] = parts;
        return new Urn(namespace, type, ids);
    }

    static dataloom(type: string, ids: string[]): Urn {
        return new Urn("dataloom", type, ids);
    }

    /**
     * Returns the namespace component.
     */
    getNamespace(): string {
        return this.namespace;
    }

    /**
     * Returns the resource component.
     */
    getResource(): string {
        return this.resource;
    }

    /**
     * Returns the array of ids.
     */
    getIds(): string[] {
        return [...this.ids];
    }
}
