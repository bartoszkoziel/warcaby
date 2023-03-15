class Game {

    constructor() {

        this.status = "NOT_READY"
        this.login = ""
        this.piecesColor = ""

        this.chosenPiece = ""
        this.token = ""

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
        // czerwone - 2
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
            if (intersects.length > 0 && this.token == true) {

                let name = intersects[0].object.name
                console.log(intersects[0].object);

                // KLIK W SWOJEGO PIONKA 
                if (name.split('_')[0] == this.piecesColor) {
                    this.choose(name)

                    // console.log("EBEBEBBEE: ", name)
                    // console.log("EBEBEBEBE: ", this.chosenPiece)
                }

                // KLIK W POLE Z ZAZNACZONYM PIONKIEM
                if (name.split('_')[0] == "tile" && this.chosenPiece != "") {
                    // console.log("KLIK W POLE : ", name)
                    // console.log("RUCH " + this.chosenPiece + "NA POLE : ", name)

                    if (this.checkMove(this.chosenPiece, name) == true) {
                        this.move(this.chosenPiece, name)
                        this.choose(-1)
                        clearInterval(net.timer)
                    } else {
                        this.choose(-1)
                    }

                }
            } else if (intersects.length == 0) {
                this.choose(-1)
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
                    let tile = new Pole(this.tileGeometry, this.blackMaterial)
                    tile.position.set(-56 + 16 * i, 0, -56 + 16 * j)

                    tile.posX = -56 + 16 * j
                    tile.posY = -56 + 16 * i
                    tile.posI = j
                    tile.posJ = i

                    tile.name = "tile_" + i + "_" + j
                    this.scene.add(tile)
                } else if (board[i][j] == 1) {
                    let tile = new Pole(this.tileGeometry, this.whiteMaterial)
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
        let count1 = 0
        let count2 = 0
        for (let i = 0; i < tabPieces.length; i++) {
            for (let j = 0; j < tabPieces.length; j++) {
                if (tabPieces[i][j] == 1) {
                    let piece = new Pionek(this.cylinderGeometry, this.whiteMaterial)
                    piece.position.set(-56 + 16 * j, 2, -56 + 16 * i)
                    piece.name = "white_" + count1
                    count1++

                    piece.posX = -56 + 16 * j
                    piece.posY = -56 + 16 * i
                    piece.posI = i
                    piece.posJ = j

                    this.scene.add(piece)
                } else if (tabPieces[i][j] == 2) {
                    let piece = new Pionek(this.cylinderGeometry, this.redMaterial)
                    piece.position.set(-56 + 16 * j, 2, -56 + 16 * i)
                    piece.name = "red_" + count2
                    count2++

                    piece.posX = -56 + 16 * j
                    piece.posY = -56 + 16 * i
                    piece.posI = i
                    piece.posJ = j

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

    async choose(name) {

        // JEŚLI WYWOŁANE Z -1 TO ODZNACZA
        for (let i = 0; i < 8; i++) {
            let obj = await this.scene.getObjectByName(this.piecesColor + "_" + i)
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

    checkMove(pieceName, tileName) {
        let piece = this.scene.getObjectByName(pieceName)
        let tile = this.scene.getObjectByName(tileName)

        // console.log("POSITION ON BOARD > X:  ", piece.posX, " Z: ", piece.posY)
        // console.log("POSITION IN PIONKI ARR > I:  ", piece.posI, " J: ", piece.posJ)

        if (this.piecesColor == "white" && tile.posI == piece.posI + 1 &&
            (tile.posJ == piece.posJ + 1 || tile.posJ == piece.posJ - 1)) {
            return true
        } else if (this.piecesColor == "red" && tile.posI == piece.posI - 1 &&
            (tile.posJ == piece.posJ + 1 || tile.posJ == piece.posJ - 1)) {
            return true
        } else {
            return false
        }
    }

    move(pieceName, tileName) {
        let piece = this.scene.getObjectByName(pieceName)
        let tile = this.scene.getObjectByName(tileName)

        this.pionki[piece.posI][piece.posJ] = 0

        let vector = {
            x: (1 / 50) * (tile.position.x - piece.position.x),
            z: (1 / 50) * (tile.position.z - piece.position.z)
        }

        console.log("VECTRTRTRTTOOOOORORORO: ", vector)

        // PODMIANA KORDOW

        let i = 0
        let smoothMvmnt = setInterval(() => {
            if (i < 50) {
                console.log("MAMMAIAI MMMMEMEMEMEMEMEMMEMEMEMMEMEME")
                piece.position.set(piece.position.x + vector.x, 2, piece.position.z + vector.z)
            } else if (i == 50) {
                piece.position.set(tile.position.x, 2, tile.position.z)
                clearInterval(smoothMvmnt)

                piece.posX = tile.position.x
                piece.posY = tile.position.y
                piece.posI = tile.posI
                piece.posJ = tile.posJ



                if (this.piecesColor == "white") {
                    this.pionki[tile.posI][tile.posJ] = 1
                } else if (this.piecesColor == "red") {
                    this.pionki[tile.posI][tile.posJ] = 2
                } else {
                    alert("COS POSZLO NAPRAWDE NIE TAK")
                }
                net.emitMove(this.pionki)
            }
            i++
        }, 1)
    }

    updateBoard() {
        for (let i = 0; i < 8; i++) {
            let tempWhite = this.scene.getObjectByName("white_" + i)
            let tempRed = this.scene.getObjectByName("red_" + i)

            this.scene.remove(tempWhite)
            this.scene.remove(tempRed)

            tempWhite = null
            tempRed = null
        }

        game.createPieces(game.pionki)
    }
}

class Pionek extends THREE.Mesh {
    constructor(geometry, material) {
        super(geometry, material) // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.posI
        this.posJ
        this.posX
        this.posZ
    }
}

class Pole extends THREE.Mesh {
    constructor(geometry, material) {
        super(geometry, material) // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha

        this.posI
        this.posJ
        this.posX
        this.posZ
    }
}