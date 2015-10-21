# V2 Changelog

1. Logo support has been dropped
	1. This was a seldom used feature and created significant edge-cases
2. "Save Output as Image" has been removed -- output is turned into an image automatically upon clicking the Download button
2. Simplified the requirements to add ships
	1. Ships are now loaded via a [Static](https://github.com/Raylehnhoff/SCFSD/blob/V2/content/scripts/Static.js) file, which will cause the rest of the ship pipeline to pick up new ships automatically
2. Ships now draw with SVGs instead of sprite images
	1. This drops support for older browsers
3. The Save process now triggers via blobs, removing the old "Save Image"
4. Added RGB Color Pickers
	1. Ships
	2. Font
	3. Background Color
5. New Ships:
	1. 85x