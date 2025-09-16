import { Command } from "commander";
import { readFileSync, writeFileSync } from "fs";
import open from "open";
import { resolve } from "path";
import { sendEmail } from "./utils/email";
import { convertMjmlToHtml } from "./utils/mjml";

const program = new Command();

program
	.command("send <mjmlPath> <recipient>")
	.description("Convert MJML to HTML and send it")
	.action(async (mjmlPath, recipient) => {
		try {
			const mjmlContent = readFileSync(resolve(mjmlPath), "utf-8");
			const { html, errors } = convertMjmlToHtml(mjmlContent);
			if (errors.length > 0) {
				console.warn("MJML conversion warnings:", errors);
			}
			await sendEmail(recipient, "Your MJML Email", html);
			console.log(`Email sent to ${recipient}`);
		} catch (error) {
			console.error("Error:", error);
		}
	});

program
	.command("preview <mjmlPath> [jsonPath]")
	.description("Preview an MJML file in the browser")
	.action((mjmlPath, jsonPath) => {
		try {
			let mjmlContent = readFileSync(resolve(mjmlPath), "utf-8");
			if (jsonPath) {
				const data = JSON.parse(readFileSync(resolve(jsonPath), "utf-8"));
				Object.keys(data).forEach((key) => {
					const regex = new RegExp(`{{${key}}}`, "g");
					mjmlContent = mjmlContent.replace(regex, data[key]);
				});
			}
			const { html, errors } = convertMjmlToHtml(mjmlContent);
			if (errors.length > 0) {
				console.warn("MJML conversion warnings:", errors);
			}
			const tempHtmlPath = resolve("src/output.html");
			writeFileSync(tempHtmlPath, html);
			open(tempHtmlPath);
			console.log(`Preview opened in browser.`);
		} catch (error) {
			console.error("Error:", error);
		}
	});

program
	.command("convert <mjmlPath> <outputPath> [jsonPath]")
	.description("Convert an MJML file to an HTML file")
	.action((mjmlPath, outputPath, jsonPath) => {
		try {
			let mjmlContent = readFileSync(resolve(mjmlPath), "utf-8");
			if (jsonPath) {
				const data = JSON.parse(readFileSync(resolve(jsonPath), "utf-8"));
				Object.keys(data).forEach((key) => {
					const regex = new RegExp(`{{${key}}}`, "g");
					mjmlContent = mjmlContent.replace(regex, data[key]);
				});
			}
			const { html, errors } = convertMjmlToHtml(mjmlContent);
			if (errors.length > 0) {
				console.warn("MJML conversion warnings:", errors);
			}
			writeFileSync(resolve(outputPath), html);
			console.log(`Successfully converted ${mjmlPath} to ${outputPath}`);
		} catch (error) {
			console.error("Error:", error);
		}
	});

program.parse(process.argv);
