#!/usr/bin/env bash
# Download high-resolution panoramic stock photos from Unsplash (free license).
# Saves to public/images/uploads/ for use in Home hero slots.
# Run from project root: ./scripts/download-panoramic-images.sh
#
# Free stock repositories: Unsplash (unsplash.com), Pexels (pexels.com), Pixabay (pixabay.com)

set -e
OUTDIR="public/images/uploads"
mkdir -p "$OUTDIR"

download() {
  local filename="$1"
  local id="$2"
  local url="https://unsplash.com/photos/${id}/download?force=true"
  echo "Downloading $filename (Unsplash $id)..."
  curl -L -s -o "$OUTDIR/$filename" "$url"
}

# Panoramic / Europe / finance – full-resolution via Unsplash download
download "panorama-1.jpg" "03O_BOsaXGk"   # Luxembourg (Cedric Letsch)
download "panorama-2.jpg" "FPdyoYNdvaM"   # Luxembourg
download "panorama-3.jpg" "2KQ5rdMTpBo"   # City skyline with green park
download "panorama-4.jpg" "ibzctPQxMro"   # Frankfurt skyline over river
download "panorama-5.jpg" "kU_JLUIbnf8"   # Frankfurt skyline Main river (Dimitri Karastelev)

echo "Done. Images saved to $OUTDIR/"
