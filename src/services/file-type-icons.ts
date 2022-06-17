import { File } from '..//types/types';

import CssIcon from '@mui/icons-material/Css';
import GifIcon from '@mui/icons-material/Gif';
import HtmlIcon from '@mui/icons-material/Html';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const FILE_TYPE_ICONS = {
    'text/css': CssIcon,
    'image/gif': GifIcon,
    'text/html': HtmlIcon,
    'audio/mpeg': AudioFileIcon,
    'application/pdf': PictureAsPdfIcon,
    'application/zip': FolderZipIcon,
    'video/mp4': FeaturedVideoIcon,
    'application/msword': SummarizeIcon,
    'image/png': AddAPhotoIcon,
    'unkown': QuestionMarkIcon,
    'directory': FolderOpenIcon,
}

export const getIconByFile = (file: File) => {
    const { type, isDirectory } = file;
    if (isDirectory) {
      return FILE_TYPE_ICONS.directory;
    }
    const icon = FILE_TYPE_ICONS[type];
    if (!icon) {
      return FILE_TYPE_ICONS.unkown;
    }
    return icon;
}

