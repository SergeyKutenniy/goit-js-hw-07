//  Cоздание галереи изображений с подключением библиотеки BasicLightBox

import { galleryItems } from "./gallery-items.js";
// Change code below this line

//Создаем разметку с помощью деструктуризации

const makeGalleryItemMarkup = ({ preview, original, description }) => {
  return `
 <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
    style="display:block"
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
  </a>
</div>
    `;
};

//Обьединием в одну стору

const makeGalleryMarkup = galleryItems.map(makeGalleryItemMarkup).join("");

// Вешаем слушателя на общий div

const galleryElements = document.querySelector(".gallery");

//Добавляем созданую разметку в ДОМ

galleryElements.insertAdjacentHTML("beforeend", makeGalleryMarkup);

//Вешаем слушателя собития 'click' на общий div галереи

galleryElements.addEventListener("click", onGalleryClick);

//Создаем ф-цию, если кликнули не на картинку - выходим

function onGalleryClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }

  // если кликнули на картинку вызываем ф-цию создания модалки

  event.preventDefault();
  modalShow(event.target.dataset.source);
}

let instance;

//Ф-ция создания модалки (библиотека basicLightBox)

function modalShow(src) {
  instance = basicLightbox.create(
    `
    <div class="modal">
        <img src="${src}" style="height:100vh; display:block"></img>
    </div>
`,
    {
      onShow: (instance) => {
        addListener(); //если модалка открыта - добавляем слушателя по нажатию на 'Esc'
      },
      onClose: (instance) => {
        removeListener(); //если модалка закрыта - удаляем слушателя по нажатию на 'Esc'
      },
    }
  );
  instance.show();
}

//Добавление слушателся на клавишу

function addListener() {
  window.addEventListener("keydown", onEscClick);
}

// При нажатии на клавишу 'Esc' собитие закрывается

function onEscClick(event) {
  if (event.code === "Escape") {
    instance.close();
  }
}

// Удаление слушателя с клавиши 'Esc'

function removeListener() {
  window.removeEventListener("keydown", onEscClick);
}
