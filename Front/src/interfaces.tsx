export interface CuadradoProps{
    left: string;
    top: string;
    width: string;
    height: string;
    backgroundColor: string;
}

export interface BasicButtonProps{
    buttonText:string;
    enviarSolicitud: (texto: string) => void;
}