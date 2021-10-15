import MBDocument from './mbDocument'
import MBDocumentList from './mbDocumentList'
import { MBClient } from './mbClient'
import MBMessaging from './helper/mbMessaging'
import MBChapter from './mbChapter'

const mbClient = new MBClient(process.env.API_ENDPOINT, 6000)
const mbDocumentList = new MBDocumentList()
window.mbClient = mbClient
window.mbDocumentList = mbDocumentList
window.MBMessaging = MBMessaging
window.MBDocument = MBDocument
window.MBChapter = MBChapter
export default { mbDocumentList, mbClient, MBMessaging, MBDocument, MBChapter }