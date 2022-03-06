function main () {
    // scene camera renderer - 3 musts
    const canvas = document.querySelector('#c')

    const fov = 70
    const aspect = canvas.clientWidth / canvas.clientHeight
    const near = 0.1
    const far = 2000

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ canvas })


    new THREE.OrbitControls(camera,canvas)

    const scene = new THREE.Scene()
    const loader = new THREE.TextureLoader()
    const texture = loader.load(
        'https://freight.cargo.site/w/1920/q/75/i/9327aad1eafc5107f674239cb15302d7fd53dfe0fb12e830c5a6d920115456a9/horizon.jpg',
        () => {
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height)
            rt.fromEquirectangularTexture(renderer, texture)
            scene.background = rt.texture
        }
    )

    function render() {
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        renderer.setSize(width, height, false)
        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()