import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import { theme } from "../theme";
import { Button } from "./Button";

export const AcceptTermsDialog = ({ acceptTerms, open }: { acceptTerms: any; open: boolean }) => {
  const dialogFullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog fullScreen={dialogFullScreen} open={open} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">
        Términos y Condiciones de Usuario #Fiscal_Digital
        <br />
        Un proyecto de ceiba.io con el apoyo de FUCUDE y HCG
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          El presente documento establece los términos y condiciones de los Usuarios de
          #Fiscal_Digital (Usuario en singular o Usuarios en plural) en los que se detalla la
          relación que se genera entre ambas partes y los propósitos para los que será utilizado el
          servicio de digitación. Al aceptar los términos el usuario reconoce como válidas todas las
          aseveraciones aquí contenidas, así como las condiciones voluntarias bajo las que se
          constituye como Usuario. #Fiscal_Digital hace de conocimiento de los usuarios y del
          público en general que es un proyecto que busca el fortalecimiento de la transparencia en
          el proceso electoral, promoviendo el civismo y el involucramiento de la ciudadanía en el
          proceso democrático guatemalteco mediante la tecnología. El proyecto no tiene afiliación
          con ninguna institución pública o partido político alguno. El código fuente del software
          del proyecto es de acceso libre, publicado en GitHub bajo la licencia MIT (MIT License).
          El Usuario reconoce que de forma voluntaria se constituye como digitador con el propósito
          específico de digitar por medio de reconocimiento visual los números contenidos en los
          duplicados de las páginas de las: “Acta Final - Cierre y Escrutinios, Documento 4” (Acta#4
          en singular o Actas#4 en plural) de las Juntas Receptoras de Votos (JRV en singular o JRVs
          en plural) de las Elecciones Generales y Elecciones al Parlacen de la República de
          Guatemala llevadas a cabo el día 16 de junio de 2019 (Primera Vuelta 2019). Dichas Actas#4
          son los 101,716 archivos JPG y JPEG entregados a fiscales informáticos por parte del
          departamento de informática del Tribunal Supremo Electoral de Guatemala (TSE) el día 21 de
          junio de 2019, acompañados de las firmas electrónicas “HASH SHA1” entregadas por medio del
          archivo digital titulado “Actas-HASH” en formato CSV. #Fiscal_Digital podrá agregar
          archivos que reciba de parte del TSE acompañados de firmas electrónicas para poder
          entregar a los Usuarios la totalidad de las 105,059 Actas#4 que componen la totalidad de
          la Primera Vuelta 2019 y que también podrá agregar Actas#4 recibidas de esta forma del
          balotaje (Segunda Vuelta 2019) a celebrarse el 11 de agosto del 2019. 1. Gratuidad: El
          Usuario establece que bajo ningún supuesto recibe honorarios, salarios o compensación
          económica alguna por digitar el contenido de las Actas#4 de las JRV; que no existe ni
          existirá relación laboral alguna ni de servicios profesionales entre el Usuario y ceiba.io
          o sus representantes, colaboradores, personeros o los dueños del dominio ni tampoco entre
          los Patrocinadores de #Fiscal_Digital (incluida la Fundación para la Cultura y el
          Desarrollo - FUCUDE, la Fundación Herencia Cultural Guatemalteca - HCG u otros
          patrocinadores). 2. Liberación de responsabilidad: los Usuarios darán de forma voluntaria
          y bajo su responsabilidad el servicio de digitación, y bajo ningún supuesto hacen
          responsables a ceiba.io y los Patrocinadores de #Fiscal_Digital del contenido de lo
          digitado; lo anterior siempre dado que el servicio es gratuito, de forma voluntaria y que
          no existe obligación alguna frente al TSE, ceiba.io, los Patrocinadores de
          #Fiscal_Digital, o cualquier persona, natural o jurídica, pública o privada, u otra
          entidad gubernamental de prestar el servicio de digitación. 3. Los Usuarios reconocen,
          aceptan y entienden, que ceiba.io y los Patrocinadores de #Fiscal_Digital no sostienen
          relación formal con el TSE, o cualquier persona, natural o jurídica, pública o privada, u
          otra entidad gubernamental para la prestación del servicio de digitación; que el servicio
          es gratuito y se hace de forma voluntaria con la única finalidad de servir a la ciudadanía
          de la República de Guatemala como mecanismo de búsqueda de transparencia y eficiencia en
          la digitación de los resultados Primera Vuelta 2019 y Segunda Vuelta 2019. 4. ceiba.io
          hace de conocimiento de los usuarios que toda la información proporcionada a través de su
          registro como usuario de #Fiscal_Digital será propiedad de ceiba.io. En ese sentido,
          ceiba.io podrá usar la información como estime pertinente, inclusive para contactar a los
          usuarios en el futuro e informarles sobre temas de interés. ceiba.io hace del conocimiento
          de los usuarios que no comercializará ni venderá la información personal recibida por los
          usuarios ni será compartida a terceros para fines promocionales o publicitarios. 5. Los
          Usuarios no asumirán responsabilidad alguna frente a al TSE, ceiba.io, los Patrocinadores
          de #Fiscal_Digital o cualquier persona, natural o jurídica, pública o privada, u otra
          entidad gubernamental por el uso que ceiba.io y los Patrocinadores de #Fiscal_Digital le
          den al resultado de la digitación. 6. Los Usuarios se comprometen a prestar el servicio de
          digitación de forma eficiente y responsable, velando en todo momento por la paridad entre
          los resultados establecidos en las Actas#4 de las JRV y lo digitado. Reconocen
          quecCeiba.io podrá eliminar el acceso de cualquier Usuario al sistema de #Fiscal_Digital
          sin restricción alguna, renunciando a cualquier posibilidad de solicitar algún
          resarcimiento de ceiba.io y los Patrocinadores de #Fiscal_Digital por la terminación del
          uso de servicio y cancelación de la cuenta de Usuario. 7. Los Usuarios entregan de manera
          formal a ceiba.io el resultado de la digitación, y renuncian a cualquier posible
          reclamación que pueda darse en el futuro por el resultado de la digitación y el resultado
          general del total de la digitación, pudiendo ser la reclamación incluso en materia de
          propiedad intelectual, derechos de autor o derechos conexos. 8. Los Usuarios entienden y
          reconocen que no existe relación legal alguna entre ceiba.io y el TSE, ceiba.io, o
          cualquier otra entidad gubernamental para proveer del servicio de digitación; que
          #Fiscal_Digital se organiza para facilitar la digitación de las Actas#4 de las JRV para
          efectos de transparencia y nunca como un proveedor de servicios técnicos o profesionales
          del TSE o de cualquier otra entidad gubernamental, ni otra entidad de derecho privado o
          público; que los patrocinios obtenidos por distintas empresas son meramente con la
          intención de que ceiba.io pueda cumplir con los objetivos del proyecto de #Fiscal_Digital
          y que no existe intercambio de servicios entre ceiba.io y los patrocinios o
          contraprestación económica alguna frente a los patrocinadores por la entrega de los
          patrocinios. 9. Los Usuarios entienden y reconocen que ceiba.io y los Patrocinadores de
          #Fiscal_Digital estarán contactando a los ganadores de premios ofrecidos en la página
          https://FiscalDigital.ceiba.io/premios el 20 de agosto del 2019 por medio del número de
          teléfono entregado en el momento de la creación de usuario. Dichos premios estarán
          disponibles para que los Usuarios anunciados los recojan en las oficinas de HCG (12
          avenida, 13-36, zona 11, Colonia Mariscal) entre las 10AM y 4PM los días hábiles a partir
          del 25 de agosto hasta el 10 de Septiembre del 2019. Todos los Usuarios reconocen que la
          cantidad de premios es limitada y estarán disponibles en el orden de llegada hasta que
          duren existencias. Si las existencias de premios se agotan, ningún Usuario podrá reclamar
          premio alguno y ceiba.io así como los Patrocinadores de #Fiscal_Digital no estarán
          obligados de ninguna manera a incrementar existencias de premios al momento de agotarse.
          El orden de llegada será determinado por el sistema de #Fiscal_Digital en base al momento
          en que cada usuario produjo las actas requeridas para cada nivel de los premios. 10. La
          entrega de premios considerará que existen 4 niveles de #Fiscal_Digital: a) Cívico (400
          Actas Digitadas); b) Platónico (3,000 Actas Digitadas); c) Socrático (10,000 Actas
          Digitadas); y d) Arturo Herbuger Asturias (Usuario con mayor número de Actas Validadas).
          Para poder obtener su premio, cada Usuario deberá presentar identificación (DPI o
          Pasaporte) y contestar una llamada telefónica al número de teléfono registrado de cada
          usuario. Si un Usuario no puede recibir llamadas al teléfono asociado a su Usuario, no
          recibirá ningún premio. 11. Todos los Usuarios que pretendan reclamar alguno de los
          premios deberán tener un Índice de Confiabilidad producto de su digitación de Actas
          Validadas dividido Actas Digitadas mayor al 85% para poder obtener un premio. Este índice
          será determinado el 20 de agosto del 2019 en base a las Actas Digitadas producidas por
          cada Usuario en #Fiscal_Digital a esa fecha. 12. Todos los Usuarios que se registren como
          #Fiscal_Digital recibirán una copia del libro “Historia Sinóptica de Guatemala” de parte
          de HCG (mientras duren existencias) que se entregará en base al momento en que cada
          Usuario produjo Actas Digitadas. 13. Los Usuarios comprenden que existe una distinción o
          “último nivel” llamada “Arturo Herbruger Asturias” la cual será otorgada a UN (1) Usuario
          que obtenga el mayor número de Actas Validadas. El Usuario acompañará a 5 miembros del
          equipo de desarrollo de #Fiscal_Digital en un viaje para conocer Grecia por 7 días con
          gastos pagados (boleto aéreo ida y vuelta desde Guatemala a Grecia, seguro de viaje,
          comidas, transporte e ingreso a ubicaciones turísticas seleccionadas) en algún momento del
          2,020. La fecha del viaje será determinada por el equipo de desarrollo de #Fiscal_Digital.
          La distinción “Arturo Herbruger Asturias” se otorgará por el equipo de #Fiscal_Digital
          únicamente si el número total de Actas Validadas generadas por Usuarios alcanza 41,980
          antes del 20 de agosto del 2019 a las 12pm, es decir, la totalidad de las elecciones por
          (1) Diputados Distritales y (2) Diputados Listado Nacional. Si la cantidad de Actas
          Validadas para esa fecha es menor a este número, la distinción de Arturo Herbruger
          Asturias no será entregada a ningún Usuario de #Fiscal_Digital sino únicamente a los 5
          miembros del equipo de desarrollo de #Fiscal_Digital. Para poder viajar, el Usuario deberá
          contar con: pasaporte vigente del 25 de agosto de 2019 hasta por lo menos el 31 de
          diciembre de 2020, 18 años de edad cumplidos antes del 31 de diciembre del 2019, y otras
          indicaciones que serán determinadas por el equipo de desarrollo de #Fiscal_Digital el 25
          de agosto del 2019 y que el Usuario deberá aceptar para asegurar la seguridad y salud del
          Usuario durante dicho viaje. Si el Usuario no cumpliera con alguna de estas condiciones,
          tendrá la opción de UNA (1) alternativa propuesta por el equipo de desarrollo de
          #Fiscal_Digital. Si esta UNA (1) alternativa es rechazada, se realizará la selección de
          otro Usuario para la distinción determinado por el equipo de #Fiscal_Digital. 14. Rifa
          #Fiscal_Digital: cada Acta Validada de cada usuario será un ticket para la rifa
          #Fiscal_Digital. Todos los tickets de todos los usuarios serán impresos en papel con su
          número el 20 de agosto del 2019 y se ingresarán todos los números en un sistema que
          mezclará todos los papeles y una persona ajena al equipo de desarrollo de #Fiscal_Digital,
          ceiba.io y los Patrocinadores de #Fiscal_Digital seleccionará, sin ver, por lo menos
          CUATRO (4) tickets ganadores el 24 de agosto de 2019 en lugar y fecha determinado por el
          equipo de desarrollo de #Fiscal_Digital. Si UN (1) Usuario resulta con más de un ticket,
          se estará seleccionando otro ticket (únicamente UN (1) ticket ganador por Usuario). La
          rifa #Fiscal_Digital únicamente se llevará a cabo si el número total de Actas Validadas
          generadas por Usuarios suma 41,980 antes del 20 de agosto del 2019 a las 12pm, es decir,
          la totalidad de las elecciones por (1) Diputados Distritales y (2) Diputados Listado
          Nacional. Si la cantidad de Actas Validadas para esa fecha es menor a este número, la rifa
          #Fiscal_Digital no se llevará a cabo. Para poder viajar, los Usuarios ganadores de la rifa
          deberán contar con: pasaporte vigente del 25 de agosto de 2019 hasta por lo menos el 31 de
          diciembre de 2020, 18 años de edad cumplidos antes del 31 de diciembre del 2019, y otros
          preparativos que serán determinados por el equipo de desarrollo de #Fiscal_Digital el 25
          de agosto del 2019 y que los Usuario deberán aceptar para asegurar la seguridad y salud
          del Usuario durante dicho viaje. Si los Usuarios no cumplieran con alguna de estas
          condiciones, tendrán la opción de UNA (1) alternativa propuesta por el equipo de
          desarrollo de #Fiscal_Digital. Si esta UNA (1) alternativa es rechazada, se realizará la
          selección de otro ticket de otro Usuario de #Fiscal_Digital por medio de un mecanismo
          similar. 15. La entrega de los premios se hará en base al cumplimiento de los supuestos
          establecidos en el proyecto de #Fiscal_Digital, y en atención a lo establecido en estos
          términos y condiciones de uso y participación. Se hace de conocimiento al público, en lo
          pertinente, que la presente rifa se apega a lo establecido en los artículos del 1630 al
          1637 del Decreto Ley 106 – Código Civil- de Guatemala y particularmente a lo establecido
          en el 1637 del cuerpo legal citado anteriormente en cuanto a la propiedad de la obra
          premiada.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={acceptTerms} color="primary" autoFocus>
          Acepto
        </Button>
      </DialogActions>
    </Dialog>
  );
};
