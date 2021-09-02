var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

(function () {
  const prepared = document.createElement('template')
  prepared.innerHTML = `
        <style>
        </style>
        <div id="root" style="width: 100%; height: 100%;">
        </div>
      `
  class SamplePrepared extends HTMLElement {
    constructor() {
      super()

      this._shadowRoot = this.attachShadow({
        mode: 'open'
      })
      this._shadowRoot.appendChild(prepared.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')

      this._props = {}

      this.render()
    }

    onCustomWidgetResize(width, height) {
      this.render()
    }

    async render() {
      await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')

      const chart = echarts.init(this._root, 'dark')
      var data = [];

      const option = {
        backgroundColor: '#000',
        globe: {
            baseTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
            heightTexture: ROOT_PATH + "/data-gl/asset/world.topo.bathy.200401.jpg",
            displacementScale: 0.04,
            shading: 'realistic',
            environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
            realisticMaterial: {
                roughness: 0.9
            },
            postEffect: {
                enable: true
            },
            light: {
                main: {
                    intensity: 5,
                    shadow: true
                },
                ambientCubemap: {
                    texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
                    diffuseIntensity: 0.2
                }
            }
        }
    };
    
      chart.setOption(option)
    }
  }

  customElements.define('com-sap-sample-echarts-globe', SamplePrepared)
})()