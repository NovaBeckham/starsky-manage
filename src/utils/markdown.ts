/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-03-08 16:11:21
 */

import MarkdownIt from 'markdown-it'
import MarkdownItMermaid from '@agoose77/markdown-it-mermaid'
import MermaidItKatex from '@iktakahiro/markdown-it-katex'

export default function markdownToHtml(content: any) {
	const md = new MarkdownIt({ html: true }).use(MermaidItKatex).use(MarkdownItMermaid)
	return md.render(content)
}
