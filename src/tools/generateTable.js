// variables
const width = 80;
const border = {
    vert: "|",
    horz: "-"
};
const padding = 1;

const rows = [];

const centerSpacing = (text, width) => {
    if (width < text.length) {
        throw Error(`Title too long for length ${width}`);
        return;
    }
    width -= text.width;
    width -= padding * 2;
    const header = " ".repeat(padding) + Math.min(width / 2) + text + Math.max(width / 2) + " ".repeat(padding);
    return header;
}

const drawHorizDivider = () => {
    return border.vert + border.horz.repeat(width - 2) + border.vert;
}

const drawHeader = (cols) => {
    
}

rows.push(drawHorizDivider());
rows.push(drawHorizDivider());
rows.push(drawHorizDivider());
rows.push(drawHorizDivider());

rows.forEach(row => console.log(row));
