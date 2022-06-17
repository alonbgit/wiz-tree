import httpService from './http-service';
import { File, Files, MIMEFileTypesList, MIMEFileType } from '../types/types';

const MAX_RANDOM_FILES = 5;

class FilesService {
    static uId = 1;

    async fetchRootFiles (): Promise<Files> {
        const randomFiles = this.generateRandomFiles(5);
        const files = await httpService.get<Files>(randomFiles);
        return files;
    }

    async fetchFiles (): Promise<Files> {
        const randomFiles = this.generateRandomFiles(0);
        const files = await httpService.get<Files>(randomFiles);
        return files;
    }

    private generateUId = () => {
        const newUId = `dir-${FilesService.uId}`;
        FilesService.uId++;
        return newUId;
    }

    private generateRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min; 

    private generateRandomFiles (minFiles): Files {
        const numberOfFiles = this.generateRandomNumber(minFiles, MAX_RANDOM_FILES);
        const files: Files = [];
        for (let i = 0; i < numberOfFiles; i++) {
            const lastModifiedDate = this.generateRandomDate()
            const file: File = {
                lastModified: lastModifiedDate.getTime(),
                lastModifiedDate,
                name: this.generateRandomFileName(),
                size: this.generateRandomSize(),
                isDirectory: this.generateIsDirectory(),
                uId:  this.generateUId(),
            }
            if (!file.isDirectory) {
                file.type = this.generateRandomMIMEType();
            } 
            files.push(file);
        }
        return files;
    }

    private generateRandomMIMEType (): MIMEFileType {
        const rand = this.generateRandomNumber(0, MIMEFileTypesList.length - 1);
        return MIMEFileTypesList[rand] as MIMEFileType;
    }

    private generateRandomSize = (): number => this.generateRandomNumber(100, 6530654)

    private generateRandomFileName = (): string => (Math.random() + 1).toString(36).substring(7)

    private generateRandomDate = (): Date => new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))

    private generateIsDirectory () {
        const rand = this.generateRandomNumber(0, 1);
        return rand === 0 ? false : true;
    }
}

const service = new FilesService;
export default service;