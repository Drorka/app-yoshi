console.log('Hi')

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

const loggedinUser = {
	email: 'mario@mario.com',
	fullname: 'Mario Mario',
}

export const mailService = {
	query,
	get,
	remove,
	save,
	changeFolder,
	toggleMarkAs,
	changeIsRead,
	getInboxUnreadAmount,
	getEmptyMail,
	getDefaultCriteria,
	getNextMailId,
	getPrevMailId,
}

function query(criteria = getDefaultCriteria()) {
	return asyncStorageService.query(MAIL_KEY).then((mails) => {
		if (criteria.txt) {
			const regex = new RegExp(criteria.txt, 'i')
			mails = mails.filter((mail) => regex.test(mail.title))
		}
		if (criteria.status) {
			mails = mails.filter((mail) => mail.status === criteria.status)
		}
		return mails
	})
}

function get(mailId) {
	console.log('mail service get', mailId)
	return asyncStorageService.get(MAIL_KEY, mailId)
}

function getNextMailId(mailId) {
	return asyncStorageService.query(MAIL_KEY).then((mails) => {
		var idx = mails.findIndex((mail) => mail.id === mailId)
		if (idx === mails.length - 1) idx = -1
		return mails[idx + 1].id
	})
}

function getPrevMailId(mailId) {
	return asyncStorageService.query(MAIL_KEY).then((mails) => {
		var idx = mails.findIndex((mail) => mail.id === mailId)
		if (idx === 0) idx = mails.length
		return mails[idx - 1].id
	})
}

function remove(mailId) {
	return asyncStorageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
	if (mail.id) {
		return asyncStorageService.put(MAIL_KEY, mail)
	} else {
		return asyncStorageService.post(MAIL_KEY, mail)
	}
}

function changeFolder(mailId, folder) {
	const mails = storageService.loadFromStorage(MAIL_KEY)
	const mailToMove = mails.find((mail) => mail.id === mailId)
	mailToMove.status = folder
	return save(mailToMove)
}

function toggleMarkAs(mailId) {
	const mails = storageService.loadFromStorage(MAIL_KEY)
	const mailToMark = mails.find((mail) => mail.id === mailId)
	console.log(mailToMark.isRead)
	mailToMark.isRead = mailToMark.isRead ? false : true
	return save(mailToMark)
}

function changeIsRead(mailId) {
	const mails = storageService.loadFromStorage(MAIL_KEY)
	const mailToMark = mails.find((mail) => mail.id === mailId)
	mailToMark.isRead = true
	return save(mailToMark)
}

function getInboxUnreadAmount() {
	const mails = storageService.loadFromStorage(MAIL_KEY)
	const inboxUnreadAmount = mails.filter(
		(mail) => mail.status === 'inbox' && mail.isRead === false
	).length
	return inboxUnreadAmount
}

function getEmptyMail(
	subject = '',
	body = '',
	status = '',
	isRead = null,
	sentAt = null,
	sender = '',
	from = '',
	to = ''
) {
	return {
		id: '',
		subject,
		body,
		status,
		isRead,
		sentAt,
		sender,
		from,
		to,
	}
}

function getDefaultCriteria() {
	const criteria = {
		status: 'inbox',
		txt: '',
	}
	return criteria
}

function _createMails() {
	let mails = storageService.loadFromStorage(MAIL_KEY)
	if (!mails || !mails.length) {
		mails = [
			{
				id: utilService.makeId(),
				subject: 'Miss you',
				body: 'Would love to catch up sometimes',
				status: 'inbox',
				isRead: true,
				sentAt: 1551133930594,
				sender: 'Momo',
				from: 'momo@momo.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Its a-me, Mario!',
				body: 'babadaboopi, boobidibapi! ',
				status: 'sent',
				isRead: true,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'Mario',
				from: 'mario@mario.com',
				to: 'peach@peach.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Mama mia...',
				body: 'Take it easy, Luigi, things could be worse!',
				status: 'inbox',
				isRead: false,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'Luigi',
				from: 'luigi@luigi.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Mario, help me!',
				body: 'our quest is over',
				status: 'inbox',
				isRead: false,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'Princess Peach',
				from: 'peach@peach.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'This should FINISH you!',
				body: 'All this power, and good looks too! I know what youre thinking...',
				status: 'sent',
				isRead: true,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'Mario',
				from: 'mario@mario.com',
				to: 'bowser@bowser.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Bwah hah hah!',
				body: 'Mario! Prepare yourself for the great beyond! ',
				status: 'trash',
				isRead: false,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'Bowser',
				from: 'bowser@bowser.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Its a-me, Mario!',
				body: 'babadaboopi, boobidibapi! ',
				status: 'drafts',
				isRead: true,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'Mario',
				from: 'mario@mario.com',
				to: 'peach@peach.com',
			},
		]
		storageService.saveToStorage(MAIL_KEY, mails)
	}
}

// function _createBook(title, description, thumbnail, listPrice) {
// 	const book = getEmptyBook(title, description, thumbnail, listPrice)
// 	book.id = utilService.makeId()
// 	return book
// }
