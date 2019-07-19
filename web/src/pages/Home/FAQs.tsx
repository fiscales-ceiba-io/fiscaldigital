import React from "react";
import { Container, Grid, Typography, View } from "../../components";
import { theme } from "../../theme";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const FAQs = () => (
  <>
    <Header />
    <View
      minHeight="100vh"
      bgcolor="secondary.main"
      style={{
        paddingBottom: theme.spacing(6),
        paddingTop: (theme.mixins.toolbar.minHeight as number) * 2.3,
      }}
      id="faqs"
    >
      <Container maxWidth="xl">
        <Grid container style={{ marginBottom: theme.spacing(5) }}>
          <Grid item>
            <Typography variant="h2">Preguntas Frecuentes</Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-between" spacing={3}>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              ¿Por qué no me llega mi código de acceso SMS?
            </Typography>
            <Typography variant="body1" style={text}>
              a) Intenta nuevamente ingresar tus datos, si el sistema te muestra un error, intenta
              haciendo click en “Ya tengo una cuenta”. Solo permitimos un usuario por número de
              teléfono, así que es importante saber si ya tienes una cuenta.
            </Typography>
            <Typography variant="body1" style={text}>
              b) La única empresa de telefonía en Guatemala que no funciona con nuestro sistema es
              Tuenti. Si tu celular es Tuenti, por el momento no podrás digitar. Estamos trabajando
              en una solución para este problema pero está, por el momento, fuera de nuestras manos.
              Sugerimos conseguir apoyo de un amigo o familiar que tenga un celular de cualquier
              otra empresa.
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              No soy guatemalteco, ¿puedo digitar?
            </Typography>
            <Typography variant="body1" style={text}>
              El sistema no requiere que seas guatemalteco. Cualquier persona en el mundo con
              teléfono que reciba SMS, computadora y acceso a internet puede digitar. Creemos que la
              ciudadanía global puede apoyar la transparencia democrática de cualquier país y puede
              hacerlo siendo un #Fiscal_Digital. Nuestro código es abierto y en el futuro pensamos
              ofrecer #Fiscal_Digital en otros países. Para que el mundo ayude a Guatemala,
              Guatemala debe ayudar al mundo.
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              Soy menor de edad, ¿puedo digitar?
            </Typography>
            <Typography variant="body1" style={text}>
              ¡Sí! Los únicos requisitos son acceso a un teléfono que reciba SMS, computadora e
              internet. ¡No importa tu edad! Los jóvenes y los niños pueden y deben participar en el
              fortalecimiento de la democracia. ¡Todos podemos ser #Fiscal_Digital!
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              ¿Por qué estoy viendo actas de la misma elección?
            </Typography>
            <Typography variant="body1" style={text}>
              Hubo 5 elecciones el 16 de junio del 2019: (1) Diputados Distritales, (2) Diputados
              Listado Nacional, (3) Diputados PARLACEN, (4) Presidencia y Vicepresidencia y (5)
              Corporaciones Municipales. #Fiscal_Digital estará priorizando las elecciones en este
              orden para ofrecer resultados relevantes lo antes posible a la ciudadanía. Cuando
              todas las actas de una elección sean Validadas, #Fiscal_Digital comenzará a entregar
              actas de la siguiente elección a los usuarios.
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              ¿Cómo deciden qué acta digita un usuario?
            </Typography>
            <Typography variant="body1" style={text}>
              Seleccionamos actas de cada elección de manera aleatoria entre las miles actas que no
              se han digitado. De esta manera aseguramos que sea prácticamente imposible que los
              resultados generados por #Fiscal_Digital puedan favorecer a un partido en vez de
              reflejar los datos reales consignados en los documentos, producto de una digitación
              sincera de un buen #Fiscal_Digital. Osea, ningún usuario podrá predecir qué acta
              estará digitando, así, mientras más usuarios digiten con #Fiscal_Digital, será cada
              vez menor la probabilidad que alguien pueda manipular los resultados coordinando
              usuarios que ingresen resultados con el objetivo de ingresar datos para favorecer a
              algún partido.
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              ¿Cómo se genera un Acta Digitada?
            </Typography>
            <Typography variant="body1" style={text}>
              Cada usuario genera una serie de valores en base a su digitación y se suben a su
              perfil personal en la base de datos de #Fiscal_Digital al momento de presionar
              “Continuar” al final de cada acta. Estos valores son registrados en la base de datos
              bajo cada usuario. Así calculamos la cantidad de Actas Digitadas.
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              ¿Cómo se genera un Acta Validada?
            </Typography>
            <Typography variant="body1" style={text}>
              A cada Acta Digitada se le aplica una función criptográfica “hash”, generando una
              firma alfanumérica específica que es única para esa digitación. El sistema
              constantemente revisa si hay coincidencias exactas entre un Acta Digitada de un
              usuario y otro. Cuando el sistema reconoce que hay 4 Actas Digitadas con firmas
              electrónicas idénticas, se califican las actas como Actas Validadas y se agregan estos
              a los totales específicos de esta elección. Además, las Actas Validadas se dejan de
              entregar a usuarios para que no se digiten nuevamente aquellas que ya cuentan con una
              digitación validada. Si llegáramos a lograr un número alto de usuarios,
              incrementaremos el número de coincidencias exactas requeridas para considerar un Acta
              Validada. Nuestro tope máximo será 10 coincidencias exactas.
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              ¿Qué pasa con las actas que se “! Marcan como Ilegibles”?
            </Typography>
            <Typography variant="body1" style={text}>
              Las actas que un usuario marca como ilegible no son sumadas de la misma forma, pero
              cuando un acta específica llegue a acumular 20 marcaciones de ilegible, pasará a un
              grupo separado. Este grupo de actas son las que identificamos como las actas que
              requieren una revisión manual por parte del TSE con partidos políticos y tampoco
              continuarán siendo entregadas a usuarios digitación.
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              ¿Cómo sé si el hash SHA1 corresponde a la imagen que estoy viendo?
            </Typography>
            <Typography variant="body1" style={text}>
              Todas las imágenes pueden ser descargadas. Al tener la imagen, se puede utilizar
              cualquier generador de hash SHA1 disponible gratuitamente en internet. Simplemente se
              sube el archivo de la imagen al generador de hash SHA1 y se verifica contra el
              entregado por el TSE.
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              ¿Cómo sé si el hash SHA1 entregado por el TSE es el oficial?
            </Typography>
            <Typography variant="body1" style={text}>
              Lamentablemente el TSE no ha hecho públicos los hash SHA1 de las actas. El listado
              utilizado es el entregado a Fiscales Informáticos de todos los partidos políticos el
              20 de junio del 2019. Sugerimos al TSE publicar en algún lugar los hash SHA1 para que
              todos puedan ser confirmados por el público en todo momento.
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              ¿Cómo así Fase 1, 2 y 3?
            </Typography>
            <Typography variant="body1" style={text}>
              El desarrollo de una solución tecnológica conlleva altos costos de operación
              (servicios de computación en la nube, entre otros) y mucho tiempo de talentosas
              personas que han trabajado como voluntarios de forma gratuita. La fase 1 es una
              contribución del equipo de #Fiscal_Digital para la ciudadanía guatemalteca y funciona
              para el 80% de las elecciones de junio 2019. Si nuestro trabajo de voluntario funciona
              y es valorado por medio de donaciones tipo “crowdfunding”, podemos concluir las
              siguientes dos fases.
            </Typography>
            <Typography variant="body1" style={text}>
              Fase 2:{" "}
            </Typography>
            <Typography variant="body1" style={text}>
              El 20% restante de las elecciones, las 340 elecciones de Corporaciones Municipales.
              Aplicación móvil que permita ser un #Fiscal_Digital desde un teléfono inteligente.
            </Typography>
            <Typography variant="body1" style={text}>
              Fase 3:
            </Typography>
            <Typography variant="body1" style={text}>
              una solución móvil gratuita para que las JRV generen sus propias fotografías del
              Acta#4 original, alimentando directamente el sistema de #Fiscal_Digital con las actas
              proporcionadas diréctamente por las personas que las crearon.
            </Typography>
          </Grid>
          <Grid item lg={5}>
            <Typography variant="h6" style={title}>
              ¿Cómo nos defendemos de malos actores?
            </Typography>
            <Typography variant="body1" style={text}>
              Cada usuario acumula sus resultados en su perfil de nuestra base de datos. Si
              identificamos usuarios que producen un número alto de Actas Digitadas que no coinciden
              con ninguna Acta Validada, podemos identificar usuarios con alta probabilidad de ser
              malos actores. Estaremos publicando nuestra política de identificación de malos
              actores y las consecuencias que tendrán, las cuales incluyen la eliminación del
              usuario del sistema de #Fiscal_Digital. Es importante que el trabajo hecho por cada
              #Fiscal_Digital sea un esfuerzo sincero por digitar los números escritos a mano en los
              documentos oficiales. No vamos a permitir que los resultados de #Fiscal_Digital sean
              alterados por malos actores.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </View>
    <Footer />
  </>
);

const title = { textTransform: "uppercase" as "uppercase" };
const text = {};
