function verificarCodigo() {
  const codigo = document.getElementById("codigo").value;
  const resultado = document.getElementById("resultado");

  const comandosEnsenados = {
    "🔁 Bucles": ["for", "while", "contador", "range("],
    "🧮 Variables y tipos": ["int", "float", "str", "input(", "print(", "round("],
    "📦 Listas": [
      "[", ".append(", ".remove(", "len(", "sum(", ".sort(", ".reverse(", ".join(", ".lower(", ".upper("
    ],
    "🧩 Funciones": ["def", "return"],
    "🔀 Condicionales": ["if", "elif", "else", "==", "!=", "<", ">", "<=", ">="],
    "🧪 Extras útiles": ["str(", "int(", "float(", ".isdigit("]
  };

  const comandosNoEnsenados = [
    "lambda", "map(", "filter(", "enumerate(", "zip(", "try", "except", "with", "open(", "break", "continue",
    "is", "not in", "assert", "del", "global", "nonlocal", "class", "import os", "import sys"
  ];

  let totalComandos = 0;
  let comandosEncontrados = 0;
  let resumen = "";
  let usadosNoEnsenados = [];

  for (const categoria in comandosEnsenados) {
    const comandos = comandosEnsenados[categoria];
    let encontrados = 0;
    let faltantes = [];

    comandos.forEach(comando => {
      totalComandos++;
      if (codigo.includes(comando)) {
        encontrados++;
      } else {
        faltantes.push(comando);
      }
    });

    const porcentaje = Math.round((encontrados / comandos.length) * 100);
    comandosEncontrados += encontrados;

    resumen += `<h3>${categoria} (${porcentaje}%)</h3>`;
    if (faltantes.length > 0) {
      resumen += "<p>Faltan:</p><ul>" + faltantes.map(c => `<li>${c}</li>`).join("") + "</ul>";
    } else {
      resumen += "<p>✅ Todos los comandos presentes.</p>";
    }
  }

  comandosNoEnsenados.forEach(comando => {
    if (codigo.includes(comando)) {
      usadosNoEnsenados.push(comando);
    }
  });

  const porcentajeGlobal = Math.round((comandosEncontrados / totalComandos) * 100);
  let mensajeFinal = "";

  if (porcentajeGlobal >= 80) {
    mensajeFinal = "✅ Excelente aplicación";
    resultado.className = "exito";
  } else if (porcentajeGlobal >= 70) {
    mensajeFinal = "🟡 Buen intento, revisa los faltantes, sí, pero no";
    resultado.className = "error";
  } else if (porcentajeGlobal >= 50) {
    mensajeFinal = "🟠 Necesita revisión";
    resultado.className = "error";
  } else {
    mensajeFinal = "🔴 No cumple con lo enseñado";
    resultado.className = "error";
  }

  let alertaIA = "";
  if (usadosNoEnsenados.length > 0) {
    alertaIA = `<h3>⚠️ Comandos no enseñados detectados:</h3><ul>` +
      usadosNoEnsenados.map(c => `<li>${c}</li>`).join("") +
      `</ul><p>Estos comandos no forman parte del currículo actual. Se recomienda revisar si fueron comprendidos o simplemente copiados.</p>`;
  }

  resultado.innerHTML = `<h2>${mensajeFinal}</h2><p>Validación global: ${porcentajeGlobal}%</p>` + resumen + alertaIA;
}
