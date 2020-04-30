function phoneCheck(inputElem) {
  const input = document.querySelector(inputElem);

  function phoneMask(e) {
    let matrix = '+7 (___) ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    })

    if (e.type === 'blur') {
      if (this.value.length == 2) {
        this.value = '';
      }
    } else {
      setCursor(this.value.length, this);
    }

  }
  input.addEventListener('input', phoneMask)
  input.addEventListener('focus', phoneMask)
  input.addEventListener('blur', phoneMask)

  function setCursor(pos, elem) {
    elem.focus();
  }

}
phoneCheck('input')