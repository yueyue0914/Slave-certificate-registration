function generateCertificate() {
    var name = document.getElementById("name").value;
    var gender = document.getElementById("gender").value;
    var role = document.querySelector('input[name="role"]:checked').value;
  
    // 生成16位随机证书编号
    var certificateNumber = Math.floor(Math.random() * 10000000000000000).toString().padStart(16, '0');
  
    var certificate = '<html><head><title>证书</title><script src="JsBarcode.all.min.js"></script></head><body style="background-color: #d3d3d3;"><div style="margin: 100px auto 0px auto; width: 1000px; height: 800px; background-color: white; text-align: center;"><h1 style="font-size: 50px; margin-top: 200px;">' + name + '</h1><h2 style="font-size: 30px;">' + gender + ' ' + role + '</h2><svg id="barcode"></svg><p style="font-size: 20px;">证书编号：' + certificateNumber + '</p></div></body></html>';
  
    var win = window.open();
    win.document.write(certificate);
    win.document.close();
  
    // 生成条形码
    JsBarcode("#barcode", certificateNumber, {
      format: "pharmacode",
      displayValue: false,
      width: 4,
      height: 40,
      margin: 0
    });
  
    // 将证书信息和条形码存储到MySQL数据库
    var xhr = new XMLHttpRequest();
    var url = "save_certificate.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    var data = "name=" + name + "&gender=" + gender + "&role=" + role + "&certificate_number=" + certificateNumber;
    xhr.send(data);
  }
  