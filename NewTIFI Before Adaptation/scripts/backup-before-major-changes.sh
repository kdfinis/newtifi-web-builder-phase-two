#!/bin/bash

# Backup Script - Run before making major changes
# This prevents data loss during development

echo "🛡️  Creating backup before major changes..."

# Create timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="backups/pre-change-backup-$TIMESTAMP"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup critical files
echo "📁 Backing up critical files..."

# Backup source code
cp -r src/ "$BACKUP_DIR/src-backup/"

# Backup configuration files
cp package.json "$BACKUP_DIR/"
cp vite.config.ts "$BACKUP_DIR/"
cp tsconfig.json "$BACKUP_DIR/"
cp tailwind.config.ts "$BACKUP_DIR/"

# Backup public assets
cp -r public/ "$BACKUP_DIR/public-backup/"

# Create git backup
echo "📦 Creating git backup..."
git stash push -m "Pre-change backup $TIMESTAMP"

# Create restore script
cat > "$BACKUP_DIR/restore.sh" << 'EOF'
#!/bin/bash
echo "🔄 Restoring from backup..."

# Restore source code
rm -rf src/
cp -r src-backup/ src/

# Restore configuration files
cp package.json ../
cp vite.config.ts ../
cp tsconfig.json ../
cp tailwind.config.ts ../

# Restore public assets
rm -rf ../public/
cp -r public-backup/ ../public/

echo "✅ Restore complete!"
EOF

chmod +x "$BACKUP_DIR/restore.sh"

echo "✅ Backup created at: $BACKUP_DIR"
echo "🔄 To restore: cd $BACKUP_DIR && ./restore.sh"
echo "📝 Backup timestamp: $TIMESTAMP"
