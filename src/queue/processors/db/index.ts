import * as Bull from 'bull';
import { deleteNotes } from './delete-notes';
import { deleteDriveFiles } from './delete-drive-files';
import { deleteNote } from './delete-note';
import { deleteSignins } from './delete-signins';
import { exportNotes } from './export-notes';
import { exportFollowing } from './export-following';
import { exportMute } from './export-mute';
import { exportBlocking } from './export-blocking';
import { exportUserLists } from './export-user-lists';
import { importFollowing } from './import-following';
import { importBlocking } from './import-blocking';
import { importMute } from './import-mute';
import { importUserLists } from './import-user-lists';
import { notifyPollFinished } from './notify-poll-finished';
import { expireMute } from './expire-mute';
import { DbJobData } from '../../types';

const jobs = {
	deleteNotes,
	deleteDriveFiles,
	deleteNote,
	deleteSignins,
	exportNotes,
	exportFollowing,
	exportMute,
	exportBlocking,
	exportUserLists,
	importFollowing,
	importBlocking,
	importMute,
	importUserLists,
	notifyPollFinished,
	expireMute,
} as Record<string, Bull.ProcessCallbackFunction<DbJobData> | Bull.ProcessPromiseFunction<DbJobData>>;

export default function(dbQueue: Bull.Queue) {
	for (const [k, v] of Object.entries(jobs)) {
		dbQueue.process(k, v);
	}
}
