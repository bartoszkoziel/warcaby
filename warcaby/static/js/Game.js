class Game {

    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
        this.camera.position.set(200, 200, 200)
        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x656565);
        this.renderer.setSize(innerWidth, innerHeight);
        document.getElementById("root").append(this.renderer.domElement);

        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes)

        this.tileGeometry = new THREE.BoxGeometry(15, 2, 15)
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

        this.szachownica = [

            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],

        ];

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
                    let tile = new THREE.Mesh(this.tileGeometry, this.whiteMaterial)
                    tile.position.set(15 * i, 0, 15 * j)
                    tile.name = i + "_" + j
                    this.scene.add(tile)
                } else if (this.szachownica[i][j] == 1) {
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
}