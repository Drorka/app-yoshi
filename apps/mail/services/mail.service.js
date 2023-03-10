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
	sortMailsBy,
	getNextMailId,
	getPrevMailId,
	sendMail,
}

function query(criteria = getDefaultCriteria()) {
	return asyncStorageService.query(MAIL_KEY).then((mails) => {
		if (criteria.txt) {
			mails = mails.filter(
				(mail) =>
					mail.subject.toLowerCase().includes(criteria.txt.toLowerCase()) ||
					mail.body.toLowerCase().includes(criteria.txt.toLowerCase())
			)
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
	removedAt = null,
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
		removedAt,
		sender,
		from,
		to,
	}
}

function sendMail(subject, body, to) {
	const mailToSend = {
		id: '',
		subject: subject,
		body: body,
		status: 'sent',
		isRead: true,
		sentAt: new Date(),
		removedAt: null,
		sender: 'Mario',
		from: 'mario@mario.com',
		to: to,
	}
	return save(mailToSend)
}

function getDefaultCriteria() {
	const criteria = {
		status: 'inbox',
		txt: '',
	}
	return criteria
}

function sortMailsBy(val) {
	console.log('service', val)
	const mails = storageService.loadFromStorage(MAIL_KEY)
	console.log('from storage', mails)
	if (val === 'sentAt') {
		mails.sort((a, b) => b.sentAt - a.sentAt)
	} else if (val === 'subject') {
		mails.sort((a, b) => a.subject.localeCompare(b.subject))
	}
	console.log('to storage', mails)
	storageService.saveToStorage(MAIL_KEY, mails)
	return Promise.resolve()
}

function _createMails() {
	let mails = storageService.loadFromStorage(MAIL_KEY)
	if (!mails || !mails.length) {
		mails = [
			{
				id: utilService.makeId(),
				subject: 'When I kiss the Princess, Im-a get to fly heavy.',
				body: 'Hey, you got a good joke for Mario? Typing is-a fun! Try it!',
				status: 'sent',
				isRead: true,
				sentAt: 1641491246000,
				removedAt: null,
				sender: 'Momo',
				from: 'mario@mario.com',
				to: 'luigi@luigi.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Its a-me, Mario!',
				body: 'Oh, boy! Finally! Im-a get to move on the ground!',
				status: 'sent',
				isRead: true,
				sentAt: 1660326446000,
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
				sentAt: 1669916846000,
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
				sentAt: 1645206446000,
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
				sentAt: 1662572846000,
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
				sentAt: 1667756846000,
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
				sentAt: 1641491246000,
				removedAt: null,
				sender: 'Mario',
				from: 'mario@mario.com',
				to: 'peach@peach.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Yoshi is in da house',
				body: 'Oooh! Youre doing great!',
				status: 'inbox',
				isRead: true,
				sentAt: 1654537646000,
				removedAt: null,
				sender: 'Yoshi',
				from: 'yoshi@yoshi.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Oh, wait a minute..',
				body: 'Hey, Im-a thirsty? Have you got something to drink-a?',
				status: 'sent',
				isRead: false,
				sentAt: 1665078446000,
				removedAt: null,
				sender: 'Mario',
				from: 'mario@mario.com',
				to: 'peach@peach.com',
			},
			{
				id: utilService.makeId(),
				subject: 'I bet youre an expert, too.',
				body: 'My nose-a feels-a funny against this screen.',
				status: 'inbox',
				isRead: false,
				sentAt: 1667843246000,
				removedAt: null,
				sender: 'Luigi',
				from: 'luigi@luigi.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'What about this one',
				body: 'Uh, youre so good youve got Mario confused!',
				status: 'inbox',
				isRead: false,
				sentAt: 1662572846000,
				removedAt: null,
				sender: 'Princess Peach',
				from: 'peach@peach.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Lets-a play, eh?',
				body: 'Thank you so much-a! Im a king now!',
				status: 'sent',
				isRead: true,
				sentAt: 1657216046000,
				removedAt: null,
				sender: 'Mario',
				from: 'mario@mario.com',
				to: 'bowser@bowser.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Yoohoo, Im a waiting for you',
				body: 'Giovanni! Giovanni who? Giovanni hurry up and play for crying out loud!',
				status: 'trash',
				isRead: false,
				sentAt: 1657907246000,
				removedAt: null,
				sender: 'Bowser',
				from: 'bowser@bowser.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Mario thinks youre fantastic!',
				body: 'Pizza! Pizza who? Pizza the heck out of me!',
				status: 'drafts',
				isRead: true,
				sentAt: 1657907246000,
				removedAt: null,
				sender: 'Mario',
				from: 'mario@mario.com',
				to: 'peach@peach.com',
			},
		]
		storageService.saveToStorage(MAIL_KEY, mails)
	}
}
