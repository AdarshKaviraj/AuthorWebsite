import blockContent from './blockContent'
import post from './post'
import { blogType } from "./blogType";
import { eventType } from "./eventType";
import { commentType } from "./commentType";

export const schemaTypes = [
    eventType,
    blogType,
    commentType,
    post,
    blockContent
]
