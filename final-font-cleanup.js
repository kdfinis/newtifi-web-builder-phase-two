#!/usr/bin/env node

import fs from 'fs';
import { glob } from 'glob';

// Additional font size mappings for remaining custom sizes
const additionalMappings = {
  // Custom bracket notation sizes
  'text-[1.2rem]': 'text-xl',
  'text-[12px]': 'text-xs',
  'text-[2.4rem]': 'text-4xl',
  'text-[3rem]': 'text-4xl',
  'text-[4.5rem]': 'text-6xl',
  'text-[6rem]': 'text-6xl',
  
  // Percentage sizes
  'text-[75%]': 'text-xs',
  'text-[80%]': 'text-xs',
  'text-[93.75%]': 'text-sm',
  'text-[100%]': 'text-base',
  
  // Em sizes
  'text-[0.75em]': 'text-xs',
  'text-[1em]': 'text-base',
  
  // Legacy sizes that might still exist
  'text-3xl': 'text-2xl',
  'text-5xl': 'text-4xl',
  'text-7xl': 'text-6xl',
  'text-8xl': 'text-6xl',
  'text-9xl': 'text-6xl',
};

async function finalFontCleanup() {
  try {
    // Find all TypeScript/TSX files
    const files = await glob('src/**/*.{ts,tsx}');
    
    console.log('🧹 Final font size cleanup...\n');
    
    let totalReplacements = 0;
    let filesModified = 0;
    
    for (const file of files) {
      let content = fs.readFileSync(file, 'utf8');
      let fileModified = false;
      let replacements = 0;
      
      // Check for additional custom font sizes
      for (const [oldSize, newSize] of Object.entries(additionalMappings)) {
        const regex = new RegExp(`\\b${oldSize.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
        const matches = content.match(regex);
        
        if (matches) {
          content = content.replace(regex, newSize);
          replacements += matches.length;
          fileModified = true;
          console.log(`  📝 ${file}: ${matches.length}x ${oldSize} → ${newSize}`);
        }
      }
      
      if (fileModified) {
        fs.writeFileSync(file, content);
        totalReplacements += replacements;
        filesModified++;
      }
    }
    
    console.log(`\n✅ Final cleanup complete!`);
    console.log(`📊 Results:`);
    console.log(`   • Files modified: ${filesModified}`);
    console.log(`   • Total replacements: ${totalReplacements}`);
    
    if (totalReplacements === 0) {
      console.log(`   • No additional replacements needed!`);
    }
    
    console.log(`\n🎯 Next steps:`);
    console.log(`   1. Run 'npm run build' to rebuild CSS`);
    console.log(`   2. Check final font size count`);
    console.log(`   3. Test website appearance`);
    console.log(`   4. Remove legacy font size classes from CSS if needed`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

finalFontCleanup();
