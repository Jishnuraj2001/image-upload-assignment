document.getElementById("upload-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData();
    //when we append the file the keynames should be same in backend also in multer middleware(upload.single("testImage"))
    formData.append("testImage", document.getElementById("image").files[0]);
    formData.append("text", document.getElementById("text").value);
    uploadImageFn(formData);
});




async function uploadImageFn(formData) {
    try {
        const response = await fetch("http://localhost:3400/upload", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        if (response.status == 201) {
            alert(data.msg);
            document.getElementById("text").value = "";
            document.getElementById("image").value = "";
            window.location.reload();
        }else{
            alert(data.msg);
        }
    } catch (error) {
        console.error(error);
        alert(data.msg);
    }
}



async function fetchAllContentFn() {
    try {
      const response = await fetch("http://localhost:3400/allcontent");
      const allContent = await response.json();
     
      const contentContainer = document.getElementById("content-container");

      // Clear existing images
      contentContainer.innerHTML = "";

      // Display each image as a thumbnail
      allContent.forEach((content) => {
        const imageUrl = `http://localhost:3400/image/${content._id}`;
        const imageItem = document.createElement("div");
        imageItem.className = "image-item";

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = content.imageName;
        img.style.maxWidth = "100%";
        const textName = document.createElement("p");
        textName.textContent = content.text;

        imageItem.appendChild(img);
        imageItem.appendChild(textName);

        contentContainer.appendChild(imageItem);
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch and display all images on page load
  fetchAllContentFn();
