// Seleccionar el botón "Descargar PDF"
const btnDownloadPDF = document.querySelector('#downloadPDF');

// Escuchar el evento click del botón "Descargar PDF"
btnDownloadPDF.addEventListener('click', () => {
  // Obtener los valores del formulario
  const name = document.querySelector('#name').value;
  const cedula = document.querySelector('#cedula').value;
  const descripcion = document.querySelector('#descripcion').value;
  const foto = document.querySelector('#foto').files[0];

  // Crear un elemento <img> para cargar la imagen
  const img = document.createElement('img');

  // Cargar la imagen en el elemento <img>
  img.src = URL.createObjectURL(foto);

  // Esperar a que la imagen se cargue
  img.onload = () => {
    // Crear un elemento <canvas> para capturar la imagen y el formulario
    const canvas = document.createElement('canvas');

    // Ajustar el tamaño del canvas para incluir la imagen y el formulario
    canvas.width = img.width + 100;
    canvas.height = img.height + 200;

    // Obtener el contexto de dibujo del canvas
    const ctx = canvas.getContext('2d');

    // Dibujar la imagen en el canvas
    ctx.drawImage(img, 50, 50);

    // Dibujar los datos del formulario en el canvas
    ctx.font = '20px Arial';
    ctx.fillText(`Nombre completo: ${name}`, 50, img.height + 75);
    ctx.fillText(`Cédula: ${cedula}`, 50, img.height + 100);
    ctx.fillText(`Descripción: ${descripcion}`, 50, img.height + 125);

    // Agregar el canvas al DOM
    document.body.appendChild(canvas);

    // Convertir el canvas en una imagen PNG
    html2canvas(canvas).then(canvas => {
      // Crear un objeto jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Añadir la imagen al PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0);

      // Descargar el PDF
      setTimeout(() => {
        pdf.save('formulario.pdf');
      }, 1000);

      // Eliminar el canvas del DOM
      document.body.removeChild(canvas);
    });
  };
});
