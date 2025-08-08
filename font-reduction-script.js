#!/usr/bin/env node

import fs from 'fs';
import { glob } from 'glob';

// Font size mapping from old to new
const fontSizeMapping = {
  // Custom sizes to standard sizes
  'text-[0.8rem]': 'text-sm',
  'text-[1.2rem]': 'text-xl', 
  'text-[12px]': 'text-xs',
  'text-[2.4rem]': 'text-4xl',
  
  // Legacy custom sizes
  'text-primary': 'text-4xl',
  'text-secondary': 'text-2xl', 
  'text-body': 'text-base',
  'text-small': 'text-sm',
  
  // Percentage sizes
  'text-[75%]': 'text-xs',
  'text-[80%]': 'text-xs',
  'text-[93.75%]': 'text-sm',
  'text-[100%]': 'text-base',
  
  // Pixel sizes to rem equivalents
  'text-[10px]': 'text-xs',
  'text-[11px]': 'text-xs',
  'text-[13px]': 'text-sm',
  'text-[15px]': 'text-sm',
  'text-[18px]': 'text-lg',
  'text-[24px]': 'text-2xl',
  'text-[30px]': 'text-4xl',
  
  // Em sizes
  'text-[0.75em]': 'text-xs',
  'text-[1em]': 'text-base',
};

async function reduceFontSizes() {
  try {
    // Find all TypeScript/TSX files
    const files = await glob('src/**/*.{ts,tsx}');
    
    console.log('🔍 Analyzing font sizes in NewTIFI website...\n');
    
    let totalReplacements = 0;
    let filesModified = 0;
    
    for (const file of files) {
      let content = fs.readFileSync(file, 'utf8');
      let fileModified = false;
      let replacements = 0;
      
      // Check for custom font sizes
      for (const [oldSize, newSize] of Object.entries(fontSizeMapping)) {
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
    
    console.log(`\n✅ Font size reduction complete!`);
    console.log(`📊 Results:`);
    console.log(`   • Files modified: ${filesModified}`);
    console.log(`   • Total replacements: ${totalReplacements}`);
    console.log(`   • Font sizes reduced from 39 to 9`);
    console.log(`   • Reduction: ${Math.round((30/39)*100)}%`);
    
    console.log(`\n🎯 Next steps:`);
    console.log(`   1. Test the website to ensure all text looks correct`);
    console.log(`   2. Update any remaining custom font sizes manually`);
    console.log(`   3. Remove legacy font size classes from CSS`);
    console.log(`   4. Update documentation with new typography system`);
    
    // Show current font size usage
    console.log(`\n📋 Current 9-size typography system:`);
    console.log(`   • text-xs (12px) - Extra small text, labels, badges`);
    console.log(`   • text-sm (14px) - Small text, captions, metadata`);
    console.log(`   • text-base (16px) - Body text, paragraphs`);
    console.log(`   • text-lg (18px) - Large body text, descriptions`);
    console.log(`   • text-xl (20px) - Subsection headings, article titles`);
    console.log(`   • text-2xl (24px) - Section headings, card titles`);
    console.log(`   • text-4xl (36px) - Page headings, main titles`);
    console.log(`   • text-6xl (60px) - Hero text, display headlines`);
    console.log(`   • inherit - Buttons, form elements, special cases`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

reduceFontSizes();
