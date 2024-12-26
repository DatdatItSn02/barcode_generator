function generateBarcodes() {
    const inputData = document.getElementById('inputData').value.trim();
    if (!inputData) {
        alert('Please enter product data!');
        return;
    }

    const rows = inputData.split('\n');
    const barcodeContainer = document.getElementById('barcodeContainer');
    barcodeContainer.innerHTML = ''; // Clear previous barcodes

    rows.forEach((row, index) => {
        const columns = row.split(/\t/); // Split by tab
        const upc = columns.pop().trim(); // Extract UPC and trim whitespace
        const name = columns.join(' ').trim(); // Remaining text is the product name

        console.log(`Processing: ${name} - ${upc}`); // Log the product name and UPC

        if (upc.length !== 12 || isNaN(upc)) {
            alert(`"${upc}" mã UPC-A không hợp lệ. Mã UPC gồm 12 ký tự số và theo cấu trúc nhất định.`);
            return;
        }

        let barcodeItem = document.createElement('div');
        barcodeItem.className = 'barcode-item';

        let productName = document.createElement('div');
        productName.className = 'product-name';
        productName.textContent = name;
        barcodeItem.appendChild(productName);

        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        try {
            JsBarcode(svg, upc, { format: "upc" });
            barcodeItem.appendChild(svg);
            barcodeContainer.appendChild(barcodeItem);
        } catch (error) {
            console.error(`Error generating barcode for ${upc}:`, error);
            alert(`Lỗi tạo UPC: ${upc}. Mã UPC không hợp lệ.`);
        }
    });
}