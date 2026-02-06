#!/bin/bash
# Video Renaming Script for Skijanje 2024
# This script renames videos with proper naming conventions

echo "🎿 Renaming Skiing Videos - Skijanje 2024"
echo "=========================================="

# Function to rename video files
rename_video() {
    local old_name="$1"
    local new_name="$2"
    
    if [ -f "$old_name" ]; then
        echo "📹 Renaming: $old_name → $new_name"
        mv "$old_name" "$new_name"
    else
        echo "❌ File not found: $old_name"
    fi
}

# Rename videos with proper naming conventions
echo ""
echo "🔄 Starting video renaming process..."

# Rename videos with proper timestamps
rename_video "20240111_132857.mp4" "2024-01-11_13-28-57_Skiing_Morning.mp4"
rename_video "20240111_144551.mp4" "2024-01-11_14-45-51_Skiing_Afternoon.mp4"
rename_video "20240111_144624.mp4" "2024-01-11_14-46-24_Skiing_Afternoon_2.mp4"
rename_video "20240112_144141.mp4" "2024-01-12_14-41-41_Skiing_Day2_Afternoon.mp4"
rename_video "20240112_150802.mp4" "2024-01-12_15-08-02_Skiing_Day2_Late_Afternoon.mp4"

# Rename WhatsApp and other videos
rename_video "VID-20240112-WA0011.mp4" "2024-01-12_WhatsApp_Skiing_Video.mp4"

# Rename UUID videos with descriptive names based on size (approximate content)
rename_video "23868a0b-033e-4ec5-b074-60ba04cbac07.mp4" "2024-01-13_Skiing_Short_Clip.mp4"
rename_video "52AD3ADF-7660-42DD-BD5C-D4C8647D97D8.mp4" "2024-01-16_Skiing_Quick_Shot.mp4"
rename_video "af93de91-38c0-4800-8091-f56b334125f6.mp4" "2024-01-13_Skiing_Medium_Clip.mp4"
rename_video "bcf70a41-aeb6-40fe-aa6a-377bc7e16e29.mp4" "2024-01-13_Skiing_Standard_Clip.mp4"
rename_video "e505512a-7845-4320-adac-4f59bd4ac9cb.mp4" "2024-01-13_Skiing_Brief_Clip.mp4"
rename_video "e63f2e5d-9ef9-408f-a616-f8a880d3cd77.mp4" "2024-01-13_Skiing_Standard_Clip_2.mp4"

echo ""
echo "✅ Video renaming complete!"
echo "📁 Check the directory for renamed files"
echo ""
echo "📊 New naming convention:"
echo "   YYYY-MM-DD_HH-MM-SS_Description.mp4"
echo ""
echo "🎯 Benefits:"
echo "   - Chronological order"
echo "   - Easy to identify dates and times"
echo "   - Descriptive content labels"
echo "   - Consistent format"


