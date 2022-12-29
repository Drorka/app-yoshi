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
	getEmptyMail,
	getDefaultCriteria,
	getNextMailId,
	getPrevMailId,
}

function query(filterBy = getDefaultCriteria()) {
	return asyncStorageService.query(MAIL_KEY).then((mails) => {
		if (filterBy.txt) {
			const regex = new RegExp(filterBy.txt, 'i')
			mails = mails.filter((mail) => regex.test(mail.title))
		}
		// if (filterBy.maxPrice) {
		// 	mails = mails.filter((mail) => mail.listPrice.amount >= filterBy.maxPrice)
		// }
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

function getEmptyMail(
	title = '',
	description = '',
	thumbnail = '',
	listPrice = {
		amount: '',
		currencyCode: 'EUR',
		isOnSale: false,
	},
	reviews = []
) {
	return { id: '', title, description, thumbnail, listPrice, reviews }
}

function getDefaultCriteria() {
	const criteria = {
		status: '',
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
				isRead: true,
				sentAt: 1551133930594,
				sender: 'momo',
				from: 'momo@momo.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Its a-me, Mario!',
				body: 'babadaboopi, boobidibapi! ',
				isRead: false,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'mario',
				from: 'mario@mario.com',
				to: 'peach@peach.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Mama mia...',
				body: 'Take it easy, Luigi, things could be worse!',
				isRead: false,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'luigi',
				from: 'luigi@luigi.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Mario, help me!',
				body: 'our quest is over',
				isRead: false,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'peach',
				from: 'peach@peach.com',
				to: 'mario@mario.com',
			},
			{
				id: utilService.makeId(),
				subject: 'This should FINISH you!',
				body: 'All this power, and good looks too! I know what youre thinking...',
				isRead: false,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'mario',
				from: 'mario@mario.com',
				to: 'bowser@bowser.com',
			},
			{
				id: utilService.makeId(),
				subject: 'Bwah hah hah!',
				body: 'Mario! Prepare yourself for the great beyond! ',
				isRead: false,
				sentAt: 1551133930594,
				removedAt: null,
				sender: 'bowser',
				from: 'bowser@bowser.com',
				to: 'mario@mario.com',
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
