// Debug script to test URL mapping
const { getArticleById, getArticleBySlug } = require('./src/lib/urlMapping.ts');

console.log('Testing URL mapping...');

// Test the three articles
const testIds = ['IMJ-2025-001', 'IMJ-2025-002', 'IMJ-2025-003'];

testIds.forEach(id => {
  const mapping = getArticleById(id);
  if (mapping) {
    console.log(`✅ Article ${id}:`);
    console.log(`   Slug: ${mapping.slug}`);
    console.log(`   URL: /publishing/journals/investment-management/article/${mapping.slug}`);
    console.log(`   Title: ${mapping.title}`);
  } else {
    console.log(`❌ No mapping found for ${id}`);
  }
});

console.log('\nTesting slug lookup...');
const testSlugs = ['eltifs-compulsory-redemptions', 'bafin-aifm-portfolio-control', 'luxembourg-well-informed-investor'];

testSlugs.forEach(slug => {
  const mapping = getArticleBySlug(slug);
  if (mapping) {
    console.log(`✅ Slug ${slug}:`);
    console.log(`   ID: ${mapping.id}`);
    console.log(`   Title: ${mapping.title}`);
  } else {
    console.log(`❌ No mapping found for slug ${slug}`);
  }
}); 