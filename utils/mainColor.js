export function getImageColor(img) {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  let context = canvas.getContext("2d");

  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  // 获取像素数据
  let a = context.getImageData(0, 0, img.width, img.height);
  let data = a.data;
  // console.log(data);

  // console.log(data);
  let r = 1,
    g = 1,
    b = 1;
  // 取所有像素的平均值
  for (let row = 0; row < img.height; row++) {
    for (let col = 0; col < img.width; col++) {
      // console.log(data[((img.width * row) + col) * 4])
      if (row == 0) {
        r += data[img.width * row + col];
        g += data[img.width * row + col + 1];
        b += data[img.width * row + col + 2];
      } else {
        r += data[(img.width * row + col) * 4];
        g += data[(img.width * row + col) * 4 + 1];
        b += data[(img.width * row + col) * 4 + 2];
      }
    }
  }

  // console.log(r, g, b);
  // 求取平均值
  r /= img.width * img.height;
  g /= img.width * img.height;
  b /= img.width * img.height;

  // 将最终的值取整
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  // console.log(r, g, b);
  return "rgb(" + r + "," + g + "," + b + ")";
}

export function getUniMainColor(src, vm) {
  // 获得图片信息
  uni.getImageInfo({
    // 注意图片的地址
    src: src,
    success: (res) => {
      // console.log(res);
      vm.imgWidth = (vm.barHeight / res.height) * res.width;

      let imgHeight = 50;
      let imgWidth = 50;
      var ctx = uni.createCanvasContext("img" + vm.e.id); // 使用画布创建上下文 图片
      console.log(ctx);

      ctx.drawImage(src, 0, 0, imgWidth, imgHeight); // 设置图片坐标及大小，括号里面的分别是（图片路径，x坐标，y坐标，width，height）
      ctx.save(); //保存
      ctx.draw(true, () => {
        uni.canvasGetImageData({
          canvasId: "img" + vm.e.id,
          x: 0,
          y: 0,
          width: imgWidth,
          height: imgHeight,
          success: (res) => {
            console.log(res);

            let data = res.data;
            // console.log(data);
            let r = 1,
              g = 1,
              b = 1;
            // 取所有像素的平均值
            for (let row = 0; row < imgHeight; row++) {
              for (let col = 0; col < imgWidth; col++) {
                // console.log(data[((imgWidth * row) + col) * 4])
                if (row == 0) {
                  r += data[imgWidth * row + col] || 0;
                  g += data[imgWidth * row + col + 1] || 0;
                  b += data[imgWidth * row + col + 2] || 0;
                } else {
                  r += data[(imgWidth * row + col) * 4] || 0;
                  g += data[(imgWidth * row + col) * 4 + 1] || 0;
                  b += data[(imgWidth * row + col) * 4 + 2] || 0;
                }
              }
              // console.log(r, g, b);
            }

            // console.log(r, g, b);
            // 求取平均值
            r /= imgWidth * imgHeight;
            g /= imgWidth * imgHeight;
            b /= imgWidth * imgHeight;

            // 将最终的值取整
            r = Math.round(r);
            g = Math.round(g);
            b = Math.round(b);
            console.log(r, g, b);
            vm.mainColor = "rgb(" + r + "," + g + "," + b + ")";
            console.log(vm.mainColor);
          },
          fail: (fail) => {
            console.log(fail);
          },
        });
      });
    },
  });
}
