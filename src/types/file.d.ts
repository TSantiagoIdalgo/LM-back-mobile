export interface IFile {
    name: string
    data: Buffer
    size: number
    encoding: string
    mimetype: string
    tempFilePath: string;
}