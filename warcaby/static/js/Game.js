class Game {

    constructor() {

        this.status = "NOT_READY"
        this.login = ""
        this.piecesColor = ""

        this.chosenPiece = ""

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
        this.camera.position.set(0, 200, 0)
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x656565);
        this.renderer.setSize(innerWidth, innerHeight);
        document.getElementById("root").append(this.renderer.domElement);

        this.tileGeometry = new THREE.BoxGeometry(16, 2, 16)
        this.cylinderGeometry = new THREE.CylinderGeometry(7, 7, 4, 32)

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

        this.blueMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("mats/bluetile.png"),
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
        })

        // czarne - 0 (chodzi sie tylko po czarnych)
        // biale - 1
        this.szachownica = [
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1]
        ]

        // biale - 1
        // czarne (czerwone) - 2
        // puste - 0 (wraz z bialymi polami)
        this.pionki = [

            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],

        ]

        this.raycaster1 = new THREE.Raycaster()
        this.mouseVector1 = new THREE.Vector2()

        this.createBoard(this.szachownica)
        this.render() // wywołanie metody render

        window.addEventListener("mousedown", (e) => {
            this.mouseVector1.x = (e.clientX / window.innerWidth) * 2 - 1
            this.mouseVector1.y = -(e.clientY / window.innerHeight) * 2 + 1
            this.raycaster1.setFromCamera(this.mouseVector1, this.camera)
            const intersects = this.raycaster1.intersectObjects(this.scene.children)
            if (intersects.length > 0) {

                let name = intersects[0].object.name
                console.log(intersects[0].object);

                // KLIK W SWOJEGO PIONKA 
                if (name.split('_')[0] == this.piecesColor) {
                    console.log("___ZAZNACZONO ODPOWIEDNI KOLOR PIONKOW!!!___ ", name)

                    this.choose(name)

                    console.log(this.chosenPiece)
                    let currentPiece = this.scene.getObjectByName(name)

                }

                // KLIK W DOWOLNE POLE
                if (name.split('_')[0] == "tile" && this.chosenPiece != "") {
                    console.log("KLIK W POLE : ", name)
                    console.log("RUCH " + this.chosenPiece + "NA POLE : ", name)

                    this.move(this.chosenPiece, name)
                    this.choose(-1)
                }
            }
        })
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        console.log("render leci")
    }

    createBoard(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] == 0) {
                    let tile = new THREE.Mesh(this.tileGeometry, this.blackMaterial)
                    tile.position.set(-56 + 16 * i, 0, -56 + 16 * j)
                    tile.name = "tile_" + i + "_" + j
                    this.scene.add(tile)
                } else if (board[i][j] == 1) {
                    let tile = new THREE.Mesh(this.tileGeometry, this.whiteMaterial)
                    tile.position.set(-56 + 16 * i, 0, -56 + 16 * j)
                    tile.name = "tile_" + i + "_" + j
                    this.scene.add(tile)
                } else {
                    console.log("cos poszlo nie tak")
                }
            }
        }
    }

    createPieces(tabPieces) {
        for (let i = 0; i < tabPieces.length; i++) {
            for (let j = 0; j < tabPieces.length; j++) {
                if (tabPieces[i][j] == 1) {
                    let piece = new THREE.Mesh(this.cylinderGeometry, this.whiteMaterial)
                    piece.position.set(-56 + 16 * j, 2, -56 + 16 * i)
                    piece.name = "white_" + j
                    this.scene.add(piece)
                } else if (tabPieces[i][j] == 2) {
                    let piece = new THREE.Mesh(this.cylinderGeometry, this.redMaterial)
                    piece.position.set(-56 + 16 * j, 2, -56 + 16 * i)
                    piece.name = "red_" + j
                    this.scene.add(piece)
                }
            }
        }
    }

    refreshCamera() {
        if (this.piecesColor == "white") {
            this.camera.position.set(0, 200, -200)
            this.camera.lookAt(0, 0, 0)
        }

        if (this.piecesColor == "red") {
            this.camera.position.set(0, 200, 200)
            this.camera.lookAt(0, 0, 0)
        }
    }

    choose(name) {

        // JEŚLI WYWOŁANE Z -1 TO ODZNACZA
        for (let i = 0; i < 8; i++) {
            let obj = this.scene.getObjectByName(this.piecesColor + "_" + i)
            if (this.piecesColor == "red") {
                obj.material = this.redMaterial
            } else if (this.piecesColor == "white") {
                obj.material = this.whiteMaterial
            }
        }

        if (name != -1) {
            let piece = this.scene.getObjectByName(name)
            piece.material = this.blueMaterial
            this.chosenPiece = name
        } else {
            this.chosenPiece = ""
        }
    }

    move(pieceName, tileName) {
        let piece = this.scene.getObjectByName(pieceName)
        let tile = this.scene.getObjectByName(tileName)

        piece.position.set(tile.position.x, 2, tile.position.z)
    }
}