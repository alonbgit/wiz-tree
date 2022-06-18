import React from 'react';
import { File } from '../../types/types';

import './file-description.scss';

interface Props {
    file: File;
}

const FileDescription: React.FC<Props> = ({
    file,
}) => {
    const { lastModifiedDate, size, type, isDirectory } = file;

    return (
        <div className='file-description'>
            <label className='file-description__label'>
                Last modified:
                <span className='file-description__value'>
                    {lastModifiedDate.toLocaleDateString('en-US')}
                </span>
            </label>
            <label className='file-description__label'>
                Size:
                <span className='file-description__value'>
                    {size}
                </span>
            </label>
            <label className='file-description__label'>
                Type
                <span className='file-description__value'>
                    {isDirectory ? 'Directory' : type}
                </span>
            </label>
        </div>
    )
}

export default FileDescription;