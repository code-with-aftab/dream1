const cloudinary = require('cloudinary').v2;

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: 'yfyo2yq0',
  api_key: '312371276663934',
  api_secret: 'Fr0Ex6xqyM-nQmN_Xwbsi4UW0ek'
});

async function run() {
  try {
    console.log("Uploading sample image...");
    // 2. Upload an image
    const result = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/sample.jpg', {
      folder: 'dreamsland'
    });
    
    console.log("Secure URL:", result.secure_url);
    console.log("Public ID:", result.public_id);
    
    // 3. Get image details
    console.log("Width:", result.width);
    console.log("Height:", result.height);
    console.log("Format:", result.format);
    console.log("File Size (bytes):", result.bytes);
    
    // 4. Transform the image
    // f_auto (fetch_format: 'auto'): Automatically selects the best image format (e.g. AVIF, WebP) supported by the browser
    // q_auto (quality: 'auto'): Automatically adjusts quality/compression to deliver the smallest file size with optimal visual quality
    const transformedUrl = cloudinary.url(result.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
      secure: true
    });
    
    console.log("Done! Click link below to see optimized version of the image. Check the size and the format.");
    console.log("Transformed URL:", transformedUrl);
  } catch (error) {
    console.error("Execution error:", error);
    process.exit(1);
  }
}

run();
