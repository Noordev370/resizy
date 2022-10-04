function main() {
  const select = document.querySelector('#select');
  const imgName = select.options[select.selectedIndex].text;
  const imgWidth = document.querySelector('#width').value;
  const imgHeight = document.querySelector('#height').value;

  const imgElement = createImgElement(imgName, imgWidth, imgHeight);
  showImage(imgElement);
}

function createImgElement(imgName, imgWidth, imgHeight) {
  const fieName = imgName;
  const width = imgWidth;
  const height = imgHeight;

  const imgElement = document.createElement('img');
  const imgSrc = `http://localhost:8000/api/image?filename=${fieName}&width=${width}&height=${height}`;
  imgElement.setAttribute('src', imgSrc);
  return imgElement;
}

function showImage(imgElement) {
  const imageSpace = document.querySelector('#imagespace');
  imageSpace.replaceChildren(imgElement);
}
