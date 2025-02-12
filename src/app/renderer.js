const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

const func = async () => {
  const response = await window.versions.ip()
  const info = document.getElementById('info')
  info.innerText = `${info.innerText} - rodando na maquina: ${response}`
}

func()