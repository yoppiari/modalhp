const fs = require('fs');
const path = require('path');

const draftsDir = path.join(__dirname, '..', 'blog_drafts');
const outputDir = path.join(__dirname, 'src', 'content', 'blog');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const batchFiles = [
    'Batch_1_Top_5_Articles.md',
    'Batch_2_Articles_6_to_15.md',
    'Batch_3_Articles_16_to_24.md',
    'Batch_4_Articles_25_to_30.md'
];

let articleCounter = 0;
const startDate = new Date();
// Set to noon to avoid timezone issues when checking < now
startDate.setHours(12, 0, 0, 0);

for (const file of batchFiles) {
    const filePath = path.join(draftsDir, file);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf8');
    // Split by "## Artikel X:"
    const parts = content.split(/^## Artikel \d+:/m);

    // The first part is usually the title/header, so we skip it if it doesn't contain an article
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i].trim();
        if (!part) continue;

        // The first line should be the title
        const lines = part.split('\n');
        const title = lines[0].trim();

        // Find Target Keyword and Description
        let description = '';
        let targetKeyword = '';
        let bodyLines = [];

        let isHeader = true;
        for (let j = 1; j < lines.length; j++) {
            const line = lines[j].trim();
            if (line.startsWith('**Target Keyword:**')) {
                targetKeyword = line.replace('**Target Keyword:**', '').trim();
            } else if (line.startsWith('**Search Intent:**')) {
                // skip
            } else if (line === '' && isHeader) {
                // skip empty lines right after header
            } else if (line !== '' && isHeader && !line.startsWith('**')) {
                // This is likely the first paragraph of the article, use as description
                description = line;
                isHeader = false;
                bodyLines.push(line);
            } else {
                isHeader = false;
                bodyLines.push(lines[j]);
            }
        }

        if (!description && bodyLines.length > 0) {
            description = bodyLines.find(l => l.trim() !== '' && !l.startsWith('#') && !l.startsWith('>'));
        }

        if (!description) description = title;
        // Limit description
        if (description.length > 150) {
            description = description.substring(0, 147) + '...';
        }

        // Clean up description quotes
        description = description.replace(/"/g, "'").replace(/\n/g, ' ');

        articleCounter++;
        const postDate = new Date(startDate);
        postDate.setDate(postDate.getDate() + articleCounter); // Post 1 starts tomorrow

        // Generate slug
        const slug = title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 60)
            .replace(/-$/, '');

        // Construct Frontmatter
        const frontmatter = `---
title: "${title}"
description: "${description}"
pubDate: "${postDate.toISOString()}"
---

${bodyLines.join('\n')}
`;

        const outputPath = path.join(outputDir, `${slug}.md`);
        fs.writeFileSync(outputPath, frontmatter);
        console.log(`Created: ${slug}.md for date ${postDate.toISOString().split('T')[0]}`);
    }
}

console.log(`Successfully generated ${articleCounter} scheduled posts.`);
