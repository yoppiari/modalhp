const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'content', 'blog');
const placeholders = [
    '../../assets/blog-placeholder-1.jpg',
    '../../assets/blog-placeholder-2.jpg',
    '../../assets/blog-placeholder-3.jpg',
    '../../assets/blog-placeholder-4.jpg',
    '../../assets/blog-placeholder-5.jpg',
];

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file) {
        if (!file.endsWith('.md')) return;

        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if heroImage already exists
        if (content.includes('heroImage:')) {
            console.log(`Skipping ${file} - already has heroImage`);
            return;
        }

        // Extract title for SEO alt text
        const titleMatch = content.match(/title:\s*"([^"]+)"/);
        let title = "Artikel Blog UMKM ModalHP";
        if (titleMatch && titleMatch[1]) {
            title = titleMatch[1];
        }

        // Generate SEO alt text
        const altText = `Ilustrasi ${title}`;

        // Pick random placeholder
        const randomImage = placeholders[Math.floor(Math.random() * placeholders.length)];

        // Insert into frontmatter
        const frontmatterEndIndex = content.indexOf('---', 3);
        if (frontmatterEndIndex !== -1) {
            const insertString = `heroImage: "${randomImage}"\nheroImageAlt: "${altText}"\n`;
            content = content.slice(0, frontmatterEndIndex) + insertString + content.slice(frontmatterEndIndex);

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file} with SEO image metadata`);
        }
    });
});
