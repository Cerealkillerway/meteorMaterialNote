if (Meteor.isClient) {
    // MATERIALNOTE.JS
    $.extend($.materialnote.lang, {
        'it-IT': {
                font: {
                bold: 'Testo in grassetto',
                italic: 'Testo in corsivo',
                underline: 'Testo sottolineato',
                strikethrough: 'Testo barrato',
                clear: 'Elimina la formattazione del testo',
                height: 'Altezza della linea di testo',
                name: 'Famiglia Font',
                size: 'Dimensione del carattere'
            },
            image: {
                image: 'Immagine',
                insert: 'Inserisci Immagine',
                resizeFull: 'Dimensioni originali',
                resizeHalf: 'Ridimensiona al 50%',
                resizeQuarter: 'Ridimensiona al 25%',
                floatLeft: 'Posiziona a sinistra',
                floatRight: 'Posiziona a destra',
                floatNone: 'Nessun posizionamento',
                shapeRounded: 'Angoli arrotondati',
                shapeCircle: 'Forma: Ellisse',
                bordered: 'Bordata',
                shapeThumbnail: 'Miniatura',
                shapeNone: 'Shape: None',
                dragImageHere: 'Trascina qui un\'immagine',
                selectFromFiles: 'Scegli dai Documenti',
                url: 'URL dell\'immagine',
                remove: 'Rimuovi immagine',
                spaceRightPlus: 'Aumenta spaziatura a destra',
                spaceRightMinus: 'Diminuisci spaziatura a destra',
                spaceLeftPlus: 'Aumenta spaziatura a sinistra',
                spaceLeftMinus: 'Diminuisci spaziatura a sinistra'
            },
            link: {
                link: 'Collegamento',
                insert: 'Inserisci Collegamento',
                unlink: 'Elimina collegamento',
                edit: 'Modifica collegamento',
                textToDisplay: 'Testo del collegamento',
                url: 'URL del collegamento',
                openInNewWindow: 'Apri in una nuova finestra'
            },
            video: {
                video: 'Video',
                videoLink: 'Collegamento ad un Video',
                insert: 'Inserisci Video',
                url: 'URL del Video',
                providers: '(YouTube, Vimeo, Vine, Instagram, DailyMotion o Youku)'
            },
            table: {
                table: 'Tabella',
                striped: 'Zebrata',
                hoverable: 'Evidenziabile',
                responsive: 'Responsiva',
                bordered: 'Bordata'
            },
            hr: {
                insert: 'Inserisce una linea di separazione'
            },
            style: {
                style: 'Stili',
                normal: 'Normale',
                blockquote: 'Citazione',
                'h2-mainTitle': 'Titolo principale',
                'h3-subTitle': 'Sottotitolo',
                pre: 'Codice',
                h1: 'Titolo 1',
                h2: 'Titolo 2',
                h3: 'Titolo 3',
                h4: 'Titolo 4',
                h5: 'Titolo 5',
                h6: 'Titolo 6'
            },
            lists: {
                unordered: 'Elenco non ordinato',
                ordered: 'Elenco ordinato'
            },
            options: {
                help: 'Aiuto',
                fullscreen: 'Modalità a tutto schermo',
                codeview: 'Visualizza codice'
            },
            paragraph: {
                paragraph: 'Paragrafo',
                outdent: 'Diminuisce il livello di rientro',
                indent: 'Aumenta il livello di rientro',
                left: 'Allinea a sinistra',
                center: 'Centra',
                right: 'Allinea a destra',
                justify: 'Giustifica (allinea a destra e sinistra)'
            },
            color: {
                recent: 'Ultimo colore utilizzato',
                more: 'Altri colori',
                background: 'Sfondo',
                foreground: 'Testo',
                transparent: 'Trasparente',
                setTransparent: 'Trasparente',
                reset: 'Reimposta',
                resetToDefault: 'Normale'
            },
            shortcut: {
                shortcuts: 'Scorciatoie da tastiera',
                close: 'Chiudi',
                textFormatting: 'Formattazione testo',
                action: 'Azioni',
                paragraphFormatting: 'Formattazione paragrafo',
                documentStyle: 'Stili'
            },
            history: {
                undo: 'Annulla',
                redo: 'Ripristina'
            }
        }
    });
}