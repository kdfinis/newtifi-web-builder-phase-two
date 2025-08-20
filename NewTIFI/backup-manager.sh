#!/bin/bash
# NewTIFI Backup Manager - Safe Organization Script
# This script helps organize new backups without deleting anything

BACKUP_ROOT="$HOME/Projects/NewTIFI/backups"
DATE=$(date +%Y-%m-%d)

echo "🔒 NewTIFI Backup Manager"
echo "📅 Date: $DATE"
echo "📁 Backup Root: $BACKUP_ROOT"
echo ""

# Function to create new backup
create_backup() {
    local source="$1"
    local category="$2"
    local description="$3"
    
    if [ -d "$source" ]; then
        local backup_name="${DATE}-${description}"
        local target="${BACKUP_ROOT}/${category}/${backup_name}"
        
        echo "📦 Creating backup: $backup_name"
        echo "🎯 Category: $category"
        echo "📂 Source: $source"
        echo "🎯 Target: $target"
        
        # Create backup directory
        mkdir -p "${BACKUP_ROOT}/${category}"
        
        # Copy the backup (preserve original)
        cp -r "$source" "$target"
        
        echo "✅ Backup created successfully!"
        echo "🔗 Original preserved at: $source"
        echo "📁 Backup stored at: $target"
        echo "---"
    else
        echo "❌ Source directory not found: $source"
    fi
}

# Function to list all backups
list_backups() {
    echo "📋 Current Backup Inventory:"
    echo ""
    
    for category in Production-Ready Development Stable-Releases Emergency-Backups Archive; do
        if [ -d "${BACKUP_ROOT}/${category}" ]; then
            echo "🏷️  $category:"
            ls -la "${BACKUP_ROOT}/${category}" | grep -v "^total\|^d" | while read line; do
                if [[ $line == *"2025"* ]]; then
                    echo "   📁 $line"
                fi
            done
            echo ""
        fi
    done
}

# Function to find specific backup
find_backup() {
    local search_term="$1"
    echo "🔍 Searching for backups containing: $search_term"
    echo ""
    
    find "$BACKUP_ROOT" -type d -name "*$search_term*" 2>/dev/null | while read backup; do
        if [[ $backup != "$BACKUP_ROOT" ]]; then
            echo "📁 Found: $backup"
            ls -la "$backup" | head -3
            echo ""
        fi
    done
}

# Main menu
case "${1:-menu}" in
    "create")
        if [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ]; then
            echo "Usage: $0 create <source_path> <category> <description>"
            echo "Categories: Production-Ready, Development, Stable-Releases, Emergency-Backups, Archive"
            echo "Example: $0 create ~/Desktop/new-backup Development 'new-feature-test'"
        else
            create_backup "$2" "$3" "$4"
        fi
        ;;
    "list")
        list_backups
        ;;
    "find")
        if [ -z "$2" ]; then
            echo "Usage: $0 find <search_term>"
            echo "Example: $0 find june10"
        fi
        find_backup "$2"
        ;;
    "menu"|*)
        echo "🔄 NewTIFI Backup Manager Commands:"
        echo ""
        echo "📦 $0 create <source> <category> <description>  - Create new backup"
        echo "📋 $0 list                                    - List all backups"
        echo "🔍 $0 find <term>                             - Find specific backup"
        echo "❓ $0 menu                                    - Show this menu"
        echo ""
        echo "📁 Categories: Production-Ready, Development, Stable-Releases, Emergency-Backups, Archive"
        echo ""
        echo "💡 Example: $0 create ~/Desktop/new-save Development 'new-feature'"
        ;;
esac


