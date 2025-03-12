export type ListData<T> = {
  /**
   * Espaçamento customizado de colunas  opcional que será passado ao header e ao body
   */
  customGridSpacement?: string;
  /**
   * Formatação de pipe de data customizada, as opções atuais estão todas configuradas no enum {@link CustomDatePipes}
   */
  customDatePipe?: CustomDatePipes;
  /**
   * Estilos em comum das labels do header
   */
  sharedHeaderStyles?: {
    div?: { [key: string]: string };
    span?: { [key: string]: string };
  };
  listItemsStyles?: { [key: string]: string };
  /**
   * Flag que controla se os items da lista serão renderizados com animação padrão
   */
  animated?: boolean;
  /**
   * Comprimento mínimo da lista
   */
  minWidth?: number | string;
  /**
   * Dados do body
   */
  bodyData: {
    /**
     * Configuração de campos do tipo {@link ListDataField}
     */
    fields: Array<ListDataField>;
    /**
     * Ações
     */
    actions?: {
      /**
       *
       * @param parameters Paramêtros que podem ser passados para o callback da ação principal
       * Ação principal ao clicar no item de listagem
       */
      mainAction?: (...parameters: any[]) => any;
      /**
       * Ações que aparecerão dentro de um dropdown, acionado pelo ícone
       * de menu(colocado automaticamente quando houverem ações de dropdown) com as opções passadas
       */
      dropdownActions?: Array<{
        /**
         * Nome da ação
         */
        actionName: string;
        /**
         *
         */
        actionType?: "default" | "delete";
        /**
         *
         * @param parameters Paramêtros que podem ser passados para o callback
         * @returns void
         */
        callback: (...parameters: any[]) => any;
      }>;
    };
    /**
     * Array de objetos que será utilizado para popular as informações na lista
     */
    items: Array<T>;
  };
};

export type ListDataField = {
  /**
   * Se o campo será visualmente escondido(em situações onde é necessário utilizar um id para alguma lógica, mas não exibi-lo)
   */
  hidden?: boolean;
  /**
   * Dados sobre o header da coluna
   */
  fieldHeader: {
    /**
     * Nome da coluna
     */
    name: string;
    /**
     * Alinhamento da coluna
     */
    alignment?: "center" | "end";
    /**
     * 
     */
    allowSortBy?: boolean,
    /**
     * Estilos customizados para passar ao header
     */
    styles?: {
      div?: { [key: string]: string };
      span?: { [key: string]: string };
    };
  };
  /**
   * Propriedade dos objetos passados no array, na qual será buscada o valor a ser exibido na interface
   */
  fieldName?: string;
  /**
   * Propriedade dos objetos passados no array, na qual será buscada o valor secundário(subfield) a ser exibido embaixo do primário(campo principal) na interface
   */
  subfield?: {
    /**
     * Opção de configurar subfield como link, por padrão, é exibido junto com um ícone de external link
     */
    linkUrl?: {
      /**
       * Url base do link
       */
      baseUrl: string;
      /**
       * Campo para concatenar após a url base
       */
      fieldToConcatenate: string;
    };
    /**
     * Opção de texto padrão a ser exibido quando subfield é configurado como link, ex: Ao concatenar o link com um campo de ID,
     * ao invés de exibir o ID de um produto, pode-se colocar "Ver produto"
     */
    defaultText?: string;
    /**
     * Propriedade dos objetos passados no array, na qual será buscado o valor a ser exibido(caso configurado como link, deixar string vazia)
     */
    subfieldName: string;
    subfieldStyles?: { [key: string]: string };
  };
  /**
   * Tipo do campo, têm configurações padrão de acordo com o valor:
   * Currency é formatado em reais automaticamente
   * Date é formatado no formato dia/mês/ano - 05/04/2003 ou com outra formatação customizada passada no enum {@link CustomDatePipes}
   * Link disponibliza url para clique e configura text-decoration de underline
   * Default - sem configuração padrão
   */
  fieldType?: "default" | "currency" | "date" | "link" | "customTemplate";
  /**
   * Prefixo opcional dos campos
   */
  preffix?: string;
  /**
   * Sufixo opcional dos campos
   */
  suffix?: string;
  /**
   * Alinhamento dos campos
   */
  alignment?: "center" | "end";
  /**
   * Template customizado que pode ser passado para as colunas, referenciado por ID
   * Para passar um template customizado, deve-se criar um ng-template, e referenciá-lo por ViewChildren() no componente,
   * após isto, passa-se ao componente da lista, via @Input , a referência desse ng-template dentro de um array de objetos contendo duas propriedades:
   * {
   *  template: Referência do template em si,
   *  templateId: Id que identificará em qual coluna esse template deverá ser colocado
   * }
   *
   *
   * A lista vai receber os customTemplates existentes dentro de um @Input chamado customTemplates, que é um array com os objetos acima, @example
   *
   *    ```html
   *
   *    <ng-container *ngIf="ngTemplatesArray">
   *      <list-component
   *        [listData]="listData"
   *        [customTemplates]="ngTemplatesArray"
   *      </list-component>
   *    </ng-container>
   *
   *    ```html
   *
   *    //Component
   *
   *    @ViewChild('test') test: TemplateRef<any>;
   *    @ViewChild('test2') test2: TemplateRef<any>;
   *    @ViewChild('test3') test3: TemplateRef<any>;
   *    public ngTemplatesArray: Array<{templateId: string, template: TemplateRef<any>}>;
   *
   *    ngAfterViewInit() {
   *      this.ngTemplatesArray = [
   *        {
   *          template: this.test, templateId: "test",
   *        },
   *        {
   *          template: this.test2, templateId: "test2",
   *        },
   *        {
   *          template: this.test3, templateId: "test3",
   *        },
   *      ];
   *      this.ngTemplatesArrayLoaded = true;
   *      // Detecta mudança manualmente com o changeDetector para evitar erro "Expression changed after it has been checked"
   *      this.cd.detectChanges();
   *    }
   *
   *    public listData = {
   *      bodyData: {
   *        fields: [
   *          {
   *            fieldHeader: {
   *              name: "Número"
   *            }
   *            fieldType: "customTemplate",
   *            customTemplate: {
   *              templateId: "test"
   *            }
   *          },
   *        ]
   *      }
   *    }
   *
   *    //Component
   */
  customTemplate?: {
    templateId: string;
  };
  /**
   * Objeto que irá compor a URL do campo de tipo link
   */
  linkUrl?: {
    /**
     * Url base que será fixa no início de todo link
     */
    baseUrl: string;
    /**
     * Campo que será concatenado dinamicamente ao final da url(geralmente o mesmo nome do fieldName), exemplo:
     * baseUrl: "https://www.google.com",
     * fieldToConcatenate: "number"
     * A base url será "https://www.google.com/valor do campo número no objeto da linha atual sendo iterada"
     */
    fieldToConcatenate?: string;
  };
  /**
   * Estilos customizados dos campos, passado como um objeto JSON na convenção de sintaxe do NgStyle do Angular, exemplos:
   * { color: 'red' }
   * { border: 'none' }
   * { fontSize: '14px' }
   * { backgroundColor: 'blue' }
   *
   * É possível passar estilos para a div que contém o texto(span), e o próprio texto
   */
  sharedStyles?: {
    div?: { [key: string]: string };
    span?: { [key: string]: string };
  };
  /**
   * Estilos customizados dos campos, aplicados mediante à condição fornecida no campo de condition
   * Exemplo de condição:
   *  Aplicar cor vermelha ao campo Status, caso a propriedade "status" do objeto correspondente tenha o valor "canceled"
   *
   *  condition: {
   *    fieldName: "status",
   *    operator: "==",
   *    valueToCompare: "canceled"
   *  },
   *  styles: {
   *    span: { color: 'red' }
   *  }
   *
   */
  conditionalStyles?: Array<{
    condition: {
      /**
       * Nome da propriedade que terá o valor comparado
       */
      fieldName: string;
      /**
       * Operador de comparação
       */
      operator: "==" | "!=" | ">" | "<";
      /**
       * Valor com o qual será comparado
       */
      valueToCompare: string;
    };
    /**
     * Estilos passados da mesma maneira que nos sharedStyles(aqui, condicionais)
     */
    styles: {
      div?: { [key: string]: string };
      span?: { [key: string]: string };
    };
  }>;
};

/**
 * Enum de Date Pipes disponíveis para a listagem de datas
 */
export enum CustomDatePipes {
  /**
   * Formatação padrão: 05/04/2003
   */
  DAY_MONTH_YEAR = "dd/MM/YYYY",
  /**
   * Formatação padrão: 05/04/2003
   */
  MONTH_DAY_YEAR = "MM/dd/YYYY",
  /**
   * Formatação dia, horário: 05/04, 08:44
   */
  DAY_HOURS = "dd/MM, HH:mm",
  /**
   * Formatação apenas em horas: 08:44
   */
  HOURS = "HH:mm",
  /**
   * Formatação nome do mês, dia e horário: Julho, 05, 2023
   */
  MONTH_NAME_DAY_YEAR = "MMMM, dd, y",
  /**
   * Formatação nome do mês abreviado, dia e horário: Jul, 05, 2023
   */
  MONTH_NAME_ABBR_DAY_YEAR = "MMM dd, y",
}
