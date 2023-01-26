class Game {

    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
        this.camera.position.set(250, 100, 15 * 3.5)
        this.camera.lookAt(15 * 3.5, 0, 15 * 3.5);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x656565);
        this.renderer.setSize(innerWidth, innerHeight - 100);
        document.getElementById("root").append(this.renderer.domElement);

        // GEOMETRIE
        this.tileGeometry = new THREE.BoxGeometry(15, 2, 15)
        this.pionekGeometry = new THREE.CylinderGeometry(7, 7, 3, 25, 1)

        // MATERIAŁY
        this.blackMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("mats/blacktile.png"),
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
        })

        this.whiteMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("mats/whitetile.png"),
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
        })

        this.redMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("mats/redtile.png"),
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
        })

        this.szachownica = [
            // 0 - POLA BIAŁE
            // 1 - POLA CZARNE
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],

        ]

        this.pionki = [
            // 0 - PUSTE
            // 1 - PIONKI BIAŁE
            // 2 - PIONKI CZERWONE
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0]
        ]

        this.createBoard()
        this.render() // wywołanie metody render
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }

    createBoard() {
        for (let i = 0; i < this.szachownica.length; i++) {
            for (let j = 0; j < this.szachownica.length; j++) {
                if (this.szachownica[i][j] == 0) {
                    // POLA BIAŁE
                    let tile = new THREE.Mesh(this.tileGeometry, this.whiteMaterial)
                    tile.position.set(15 * i, 0, 15 * j)
                    tile.name = i + "_" + j
                    this.scene.add(tile)

                } else if (this.szachownica[i][j] == 1) {
                    // POLA CZARNE
                    let tile = new THREE.Mesh(this.tileGeometry, this.blackMaterial)
                    tile.position.set(15 * i, 0, 15 * j)
                    tile.name = i + "_" + j
                    this.scene.add(tile)

                } else {
                    console.log("cos poszlo nie tak")
                }
            }
        }
    }

    createPieces() {
        for (let i = 0; i < this.szachownica.length; i++) {
            for (let j = 0; j < this.szachownica.length; j++) {
                if (this.pionki[i][j] == 1) {
                    // PIONEK BIAŁY
                    let pionek = new THREE.Mesh(this.pionekGeometry, this.whiteMaterial)
                    pionek.position.set(15 * i, 3, 15 * j)
                    pionek.name = "white" + i
                    this.scene.add(pionek)
                }

                if (this.pionki[i][j] == 2) {
                    // PIONEK CZERWONY
                    let pionek = new THREE.Mesh(this.pionekGeometry, this.redMaterial)
                    pionek.position.set(15 * i, 3, 15 * j)
                    pionek.name = "red" + i
                    this.scene.add(pionek)
                }
            }
        }
    }
}