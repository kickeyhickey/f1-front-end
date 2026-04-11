/**
 *
 * @param {string} header
 *
 * @example
 * +---------------+
 * |   My Header   |
 * +---------------+
 */
export function logHeader(header) {
  const titleLine = `|   script: ${header}   |`;
  const frameLine = `+${'-'.repeat(titleLine.length - 2)}+`;

  console.log(frameLine);
  console.log(titleLine);
  console.log(frameLine);
}

export function logTimestamp() {
  const totalLength = 80;
  const date = new Date().toTimeString();
  const trimLines = Math.round((totalLength - date.length ) / 2)

  let log = '-'.repeat(trimLines)
  log += date
  log += '-'.repeat(trimLines)

  console.log(log);
}

/**
 *
 * @param {{title: string, data: string[][]}}def
 */
export function logTable(def) {
  const columnWidths = [];
  const padding = 1;
  def.data.forEach((row) => {
    row.forEach((item, i) => {
      if (columnWidths.length <= i) {
        columnWidths.push(item.length);
      } else {
        if (columnWidths[i] < item.length) {
          columnWidths[i] = item.length;
        }
      }
    });
  });

  drawRowBreak();
  drawTitle();
  def.data.forEach((row) => {
    drawRow(row);
  });
  drawRowBreak();

  function drawTitle() {
    let width = 0;
    let s = '|' + ' '.repeat(padding);

    columnWidths.forEach((columnWidth) => {
      width += columnWidth;
      width += padding * columnWidths.length;
    });

    const spaces = width - def.title.length;

    s += ' '.repeat(Math.floor(spaces / 2));
    s += def.title;
    s += ' '.repeat(Math.ceil(spaces / 2));

    s += '|';

    console.log(s);
    drawRowBreak();
  }

  function drawRowBreak() {
    let s = '+';

    columnWidths.forEach((columnWidth) => {
      s += '-'.repeat(columnWidth + padding * 2);
      s += '+';
    });

    console.log(s);
  }

  /**
   *
   * @param {string[]} items
   */
  function drawRow(items) {
    let s = '|';

    columnWidths.forEach((columnWidth, i) => {
      if (items.length <= i) {
        s += ' '.repeat(columnWidth);
      } else {
        s += ' '.repeat(padding) + items[i] +
          ' '.repeat(columnWidth - items[i].length);
      }
      s += ' '.repeat(padding) + '|';
    });

    console.log(s);
  }
}

/**
 *
 * @param {string} source
 * @param {string} destination
 */
export function logSuccessfulCopy(source, destination) {
  console.log(`copied: ${source} -> ${destination}`);
}

/**
 *
 * @param {string} source
 */
export function logSuccessfulWrite(source) {
  console.log(`file written: ${source}`);
}
