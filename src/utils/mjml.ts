import mjml2html from 'mjml';

export function convertMjmlToHtml(mjmlContent: string) {
  return mjml2html(mjmlContent);
}
