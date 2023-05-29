export type elemenOptions = ElementCreationOptions & {
    tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
    namespace?: string,
    text: string,
    html: string,
    class: string,
    classid?: string | string[],
    append?: String | HTMLElement,
    prepend?: String | HTMLElement,
    before?: String | HTMLElement,
    after?: String | HTMLElement,
    replace?: String | HTMLElement,
    event?: DocumentEventMap[],
    callback?: (node:HTMLElement) => any,
}

export type listElementOptions = elemenOptions & {
    title: string,
    content: string | string[],
}

export type svgElemenOptions = elemenOptions & {
    d: string | string[],
    dPath: string | string[],
    size?: string,
    fill?: string,
    viewBox?: string
}

export type svgElementDetails = {
    type: keyof SVGElementTagNameMap,
    data: SVGElement
};

export type kindOfNode = HTMLElement | Document | Window;

export type elementStyles = CSSStyleDeclaration | { elm : kindOfNode | String, props: CSSStyleDeclaration }[];