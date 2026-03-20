import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Configuration
const POSTS_DIR = './blog/posts';
const TEMPLATES_DIR = './blog/templates';
const OUTPUT_BLOG_HTML = './blog.html';

// Category color mapping (using Talavera colors)
const CATEGORY_COLORS = {
  'Tutorial': 'mauve',
  'Event': 'burnt-orange',
  'Article': 'cobalt-blue',
  'Community': 'forest-green',
  'Workshop': 'forest-green',
  'Debate': 'mauve'
};

console.log('🚀 Starting blog generation...\n');

// Read template files
console.log('📄 Reading template files...');
const postTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'post.html'), 'utf8');
const blogListingTemplate = fs.readFileSync(path.join(TEMPLATES_DIR, 'blog-listing.html'), 'utf8');

// Get all markdown files
console.log('📂 Scanning for markdown files...');
const mdFiles = fs.readdirSync(POSTS_DIR)
  .filter(file => file.endsWith('.md'))
  .map(file => path.join(POSTS_DIR, file));

console.log(`   Found ${mdFiles.length} markdown file(s)\n`);

if (mdFiles.length === 0) {
  console.log('⚠️  No markdown files found. Exiting.');
  process.exit(0);
}

// Process each markdown file
console.log('🔄 Processing markdown files...');
const posts = mdFiles.map(filePath => {
  const fileName = path.basename(filePath);
  console.log(`   Processing: ${fileName}`);

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Validate required fields
  if (!data.title || !data.date || !data.author || !data.excerpt) {
    console.error(`   ❌ Error: ${fileName} is missing required fields (title, date, author, excerpt)`);
    process.exit(1);
  }

  // Convert markdown to HTML
  const htmlContent = marked(content);

  // Generate post slug from filename
  const postSlug = path.basename(filePath, '.md');
  const postUrl = `blog/posts/${postSlug}.html`;

  return {
    ...data,
    content: htmlContent,
    slug: postSlug,
    url: postUrl,
    category: data.category || 'Article',
    tags: data.tags || [],
    featured: data.featured || false,
    categoryColor: CATEGORY_COLORS[data.category] || 'cobalt-blue'
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first

console.log(`   ✅ Processed ${posts.length} post(s)\n`);

// Generate individual post HTML files
console.log('📝 Generating individual post pages...');
posts.forEach(post => {
  let postHtml = postTemplate
    .replace(/{{title}}/g, escapeHtml(post.title))
    .replace(/{{excerpt}}/g, escapeHtml(post.excerpt))
    .replace(/{{slug}}/g, post.slug)
    .replace(/{{category}}/g, escapeHtml(post.category))
    .replace(/{{categoryColor}}/g, post.categoryColor)
    .replace(/{{date}}/g, formatDate(post.date))
    .replace(/{{author}}/g, escapeHtml(post.author))
    .replace(/{{content}}/g, post.content);

  const outputPath = path.join(POSTS_DIR, `${post.slug}.html`);
  fs.writeFileSync(outputPath, postHtml);
  console.log(`   ✅ Generated: ${post.slug}.html`);
});

console.log('');

// Find featured post
const featuredPost = posts.find(p => p.featured);

// Generate featured post HTML section
let featuredPostSection = '';
if (featuredPost) {
  console.log(`⭐ Featured post: ${featuredPost.title}\n`);
  featuredPostSection = `
        <!-- Featured Post -->
        <div class="card blog-post-card" style="margin-bottom: var(--spacing-3xl); border: 2px solid var(--color-primary);">
          <span class="badge" style="background-color: var(--color-secondary); color: white; padding: 0.5rem 1rem; border-radius: var(--radius-md); font-size: var(--font-size-sm); display: inline-block; margin-bottom: var(--spacing-md);">
            <span data-lang="es">✨ Destacado</span>
            <span data-lang="en">✨ Featured</span>
          </span>
          <h2 style="margin-bottom: var(--spacing-sm);">${escapeHtml(featuredPost.title)}</h2>
          <p style="color: var(--color-text-light); font-size: var(--font-size-sm); margin-bottom: var(--spacing-md);">
            ${formatDate(featuredPost.date)} • ${escapeHtml(featuredPost.author)}
          </p>
          <p style="font-size: var(--font-size-lg); margin-bottom: var(--spacing-lg);">
            ${escapeHtml(featuredPost.excerpt)}
          </p>
          <a href="${featuredPost.url}" class="btn btn-primary">
            <span data-lang="es">Leer Más</span>
            <span data-lang="en">Read More</span>
          </a>
        </div>
`;
} else {
  console.log('ℹ️  No featured post set\n');
}

// Generate blog posts HTML grid
console.log('🎨 Generating blog listing page...');
const postsHtml = posts.map(post => `
          <article class="card blog-post-card">
            <div style="margin-bottom: var(--spacing-sm);">
              <span class="badge" style="background-color: var(--${post.categoryColor}); color: white; padding: 0.25rem 0.75rem; border-radius: var(--radius-sm); font-size: var(--font-size-xs);">
                ${escapeHtml(post.category)}
              </span>
            </div>
            <h3 style="margin-bottom: var(--spacing-sm);">${escapeHtml(post.title)}</h3>
            <p style="color: var(--color-text-light); font-size: var(--font-size-sm); margin-bottom: var(--spacing-md);">
              ${formatDate(post.date)} • ${escapeHtml(post.author)}
            </p>
            <p style="color: var(--color-text-light); margin-bottom: var(--spacing-lg);">
              ${escapeHtml(post.excerpt)}
            </p>
            <a href="${post.url}" class="btn btn-outline btn-small">
              <span data-lang="es">Leer</span>
              <span data-lang="en">Read</span>
            </a>
          </article>
`).join('\n');

// Generate final blog.html
let blogHtml = blogListingTemplate
  .replace('{{FEATURED_POST_SECTION}}', featuredPostSection)
  .replace('{{POSTS_HTML}}', postsHtml);

fs.writeFileSync(OUTPUT_BLOG_HTML, blogHtml);
console.log(`   ✅ Generated: blog.html with ${posts.length} post(s)\n`);

console.log('✨ Blog generation completed successfully!\n');
console.log('Summary:');
console.log(`   📄 Total posts: ${posts.length}`);
console.log(`   ⭐ Featured posts: ${featuredPost ? 1 : 0}`);
console.log(`   📝 Individual pages: ${posts.length}`);
console.log(`   🏠 Blog listing: blog.html`);

// Helper functions
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Format in Spanish
  const esDate = date.toLocaleDateString('es-MX', options);
  return esDate;
}

function escapeHtml(text) {
  if (typeof text !== 'string') return text;

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, m => map[m]);
}
